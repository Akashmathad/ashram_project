import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { AddUserValidator } from '@/lib/validators/addUser';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { username, password, newUsername, newPassword } =
      AddUserValidator.parse(body);

    const user = await db.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return new Response('User not found', { status: 409 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response('User not found', { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.user.create({
      data: {
        username: newUsername,
        password: hashedPassword,
      },
    });

    return new Response('OK');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Could not create User', { status: 500 });
  }
}
