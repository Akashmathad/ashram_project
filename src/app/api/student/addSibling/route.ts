import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { SiblingValidator } from '@/lib/validators/sibling';
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
      nameOfSchool,
      gender,
      class: studentClass,
      age,
    } = SiblingValidator.parse(body);

    const sibling = await db.sibling.create({
      data: {
        name,
        nameOfSchool,
        gender,
        class: studentClass,
        age,
        studentId: studentId ?? '',
      },
    });

    console.log(sibling);

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

export async function DELETE(req: Request) {
  try {
    const session = await getAuthSession();
    const url = new URL(req.url);
    const searchParam = new URLSearchParams(url.searchParams);
    const siblingId = searchParam.get('siblingId');

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    await db.sibling.delete({ where: { id: siblingId ?? '' } });
    return new Response('OK');
  } catch (error) {
    return new Response('Could not delete Parent', { status: 500 });
  }
}
