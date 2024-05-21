import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import path from 'path';
import { Readable } from 'stream';

import credentials from '../../../../lib/credentials.json';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

const auth = new google.auth.GoogleAuth({
  credentials: credentials,
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
