import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { BranchValidator } from '@/lib/validators/branch';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { name, head, address, contact, place, pincode } =
      BranchValidator.parse(body);

    await db.branch.create({
      data: {
        name,
        head,
        address,
        contact,
        place,
        pincode,
      },
    });

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Could not create branch', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getAuthSession();
    const url = new URL(req.url);
    const searchParam = new URLSearchParams(url.searchParams);
    const branchId = searchParam.get('branchId');

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    await db.branch.delete({ where: { id: branchId || '' } });
    return new Response('OK');
  } catch (error) {
    return new Response('Could not delete student', { status: 500 });
  }
}
