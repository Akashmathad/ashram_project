import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    const url = new URL(req.url);
    const searchParam = new URLSearchParams(url.searchParams);
    const studentId = searchParam.get('studentId');

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    const student = await db.student.findFirst({
      where: {
        id: studentId || '',
      },
    });

    if (!student) {
      return new Response('Student not found', { status: 404 });
    }

    await db.student.update({
      where: {
        id: studentId || '',
      },
      data: {
        class: body.studentClass,
      },
    });

    return new Response('OK', { status: 200 });
  } catch (error) {
    return new Response('Could not update student', { status: 500 });
  }
}
