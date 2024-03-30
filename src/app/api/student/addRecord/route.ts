import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { RecordValidator } from '@/lib/validators/previousRecord';
import { z } from 'zod';

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
    const {
      name,
      yearOfStudy,
      class: studentClass,
      place,
      percentage,
    } = RecordValidator.parse(body);

    const record = await db.previousRecord.create({
      data: {
        name,
        class: studentClass,
        place,
        yearOfStudy: new Date(yearOfStudy),
        percentage,
        studentId: studentId ?? '',
      },
    });

    console.log(record);

    return new Response('OK');
  } catch (error) {
    console.log(error);
    //add unique constraint error
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Could not add parent', { status: 500 });
  }
}
