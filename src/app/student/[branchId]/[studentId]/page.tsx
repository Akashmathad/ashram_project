import { db } from '@/lib/db';
import { FC } from 'react';

interface pageProps {
  params: {
    branchId: string;
    studentId: string;
  };
}

const getStudent = async (branchId: string, studentId: string) => {
  const student = db.student.findFirst({
    where: {
      id: studentId,
      branchId: branchId,
    },
  });
  return student;
};

const page = async ({ params }: pageProps) => {
  const { branchId, studentId } = params;
  const studentDetails = await getStudent(branchId, studentId);
  return <div className="text-3xl">{studentDetails?.name}</div>;
};

export default page;
