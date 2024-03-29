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
