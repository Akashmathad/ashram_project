import { buttonVariants } from '@/components/ui/button';
import { db } from '@/lib/db';
import Link from 'next/link';

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
    include: {
      parent: true,
    },
  });
  return student;
};

const page = async ({ params }: pageProps) => {
  const { branchId, studentId } = params;
  const studentDetails = await getStudent(branchId, studentId);
  return (
    <div className="text-3xl">
      {studentDetails?.name}
      <Link
        href={`/student/${branchId}/${studentId}/addParent`}
        className={buttonVariants()}
      >
        Add Parent
      </Link>
    </div>
  );
};

export default page;
