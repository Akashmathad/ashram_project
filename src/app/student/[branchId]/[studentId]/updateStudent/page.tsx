import UpdateStudent from '@/components/UpdateStudent';
import { db } from '@/lib/db';

interface pageProps {
  params: {
    branchId: string;
    studentId: string;
  };
}

const getStudent = async (id: string) => {
  const student = await db.student.findFirst({
    where: {
      id,
    },
  });
  return student;
};
const page = async ({ params }: pageProps) => {
  const student = await getStudent(params.studentId);
  return (
    <>
      <UpdateStudent student={student} params={params} />
    </>
  );
};

export default page;
