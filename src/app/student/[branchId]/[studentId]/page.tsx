import DemoteStudent from '@/components/DemoteStudent';
import PromoteStudent from '@/components/PromoteStudent';
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
      previousRecord: true,
      sibling: true,
    },
  });
  return student;
};

const page = async ({ params }: pageProps) => {
  const { branchId, studentId } = params;
  const studentDetails = await getStudent(branchId, studentId);
  console.log(studentDetails);
  return (
    <div className="text-3xl">
      {studentDetails?.name}
      {studentDetails?.class}
      <Link
        href={`/student/${branchId}/${studentId}/addParent`}
        className={buttonVariants()}
      >
        Add Parent
      </Link>

      <Link
        href={`/student/${branchId}/${studentId}/addPreviousRecord`}
        className={buttonVariants()}
      >
        Add Record
      </Link>

      <Link
        href={`/student/${branchId}/${studentId}/addSibling`}
        className={buttonVariants()}
      >
        Add Sibling
      </Link>

      <Link
        href={`/student/${branchId}/${studentId}/updateStudent`}
        className={buttonVariants()}
      >
        Update Student
      </Link>
      {studentDetails?.class !== 'Degree' && (
        <PromoteStudent
          studentId={studentId}
          studentClass={studentDetails?.class || ''}
        />
      )}

      {studentDetails?.class !== 'First' && (
        <DemoteStudent
          studentId={studentId}
          studentClass={studentDetails?.class || ''}
        />
      )}
    </div>
  );
};

export default page;
