import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { StudentValidator } from '@/lib/validators/student';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      gender,
      class: studentClass,
      academicYear,
      dateOfBirth,
      religion,
      caste,
      aadharNo,
      mobileNo,
      address,
      pincode,
      motherTongue,
      bloodGroup,
      father,
      mother,
      staysWith,
      branchId,
    } = StudentValidator.parse(body);

    console.log('hello');

    await db.student.create({
      //@ts-ignore
      data: {
        name,
        gender,
        class: studentClass,
        academicYear: new Date(academicYear),
        dateOfBirth: new Date(dateOfBirth),
        religion,
        caste,
        aadharNo: BigInt(aadharNo),
        mobileNo: BigInt(mobileNo),
        address,
        pincode,
        motherTongue,
        bloodGroup,
        father,
        mother,
        staysWith,
        branchId,
      },
    });

    return new Response('OK');
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Could not add student', { status: 500 });
  }
}
