import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { ParentValidator } from '@/lib/validators/parent';
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
      type,
      qualification,
      occupation,
      aadharNo,
      mobileNo,
      income,
    } = ParentValidator.parse(body);

    await db.parent.create({
      data: {
        name,
        type,
        qualification,
        occupation,
        aadharNo: BigInt(aadharNo),
        mobileNo: BigInt(mobileNo),
        income: BigInt(income),
        studentId: studentId ?? '',
      },
    });

    return new Response('OK');
  } catch (error) {
    //add unique constraint error
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Could not add student', { status: 500 });
  }
}
