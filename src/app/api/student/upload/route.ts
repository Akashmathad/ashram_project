import { google } from 'googleapis';
import path from 'path';
import { Readable } from 'stream';
import { db } from '@/lib/db';

const auth = new google.auth.GoogleAuth({
  credentials: {
    type: process.env.GOOGLE_SERVICE_ACCOUNT_TYPE,
    project_id: process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID,
    private_key_id: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
    //@ts-ignore
    private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(
      /\\n/g,
      '\n'
    ),
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
    //@ts-ignore
    auth_uri: process.env.GOOGLE_SERVICE_ACCOUNT_AUTH_URI,
    token_uri: process.env.GOOGLE_SERVICE_ACCOUNT_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.GOOGLE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url:
      process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
  },

  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth: auth });

export async function POST(req: Request) {
  try {
    // const session = await getAuthSession();

    // if (!session?.user) {
    //   return new Response('Unauthorized', { status: 401 });
    // }

    const url = new URL(req.url);
    const searchParam = new URLSearchParams(url.searchParams);
    const studentId = searchParam.get('studentId');

    if (!studentId) {
      return new Response('No studentId found', { status: 404 });
    }

    const student = await db.student.findFirst({
      where: {
        id: studentId ?? '',
      },
    });

    if (!student) {
      return new Response('Student not found', { status: 409 });
    }

    const data = await req.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return new Response('file not present', { status: 500 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileMetadata = {
      name: Date.now() + path.extname(file.name),
      parents: ['1UgVwvfnpIRHezXcBp64JcDy5HYd_Nou_'],
    };

    const media = {
      mimeType: file.type,
      body: Readable.from(buffer),
    };

    const response = await drive.files.create({
      //@ts-ignore
      resource: fileMetadata,
      media: media,
      fields: 'id, webViewLink, webContentLink',
    });

    //@ts-ignore
    const { id, webViewLink, webContentLink } = response.data;

    await db.student.update({
      where: {
        id: studentId ?? '',
      },
      data: {
        imageDownload: webContentLink,
        imageDisplay: webViewLink,
      },
    });

    console.log(id, webContentLink, webViewLink);
    //@ts-ignore
    return new Response('ok', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error in file upload', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    // const session = await getAuthSession();

    // if (!session?.user) {
    //   return new Response('Unauthorized', { status: 401 });
    // }

    const url = new URL(req.url);
    const searchParam = new URLSearchParams(url.searchParams);
    const studentId = searchParam.get('studentId');

    if (!studentId) {
      return new Response('No studentId found', { status: 404 });
    }

    const student = await db.student.findFirst({
      where: {
        id: studentId ?? '',
      },
    });

    if (!student) {
      return new Response('Student not found', { status: 409 });
    }

    const { imageDisplay, imageDownload } = student;

    if (!imageDisplay || !imageDownload) {
      return new Response('No image links found for the student', {
        status: 404,
      });
    }

    // Extract the fileId from the imageDisplay URL
    const fileIdMatch = imageDisplay.match(/\/d\/([a-zA-Z0-9_-]+)/);
    const fileId = fileIdMatch ? fileIdMatch[1] : null;

    if (!fileId) {
      return new Response('No fileId found in the URL', { status: 404 });
    }

    await drive.files.delete({
      fileId: fileId,
    });

    await db.student.update({
      where: {
        id: studentId ?? '',
      },
      data: {
        imageDownload: null,
        imageDisplay: null,
      },
    });

    console.log(`File ${fileId} deleted successfully`);
    return new Response('File deleted successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error in file deletion', { status: 500 });
  }
}
