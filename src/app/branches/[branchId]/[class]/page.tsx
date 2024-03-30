import { db } from '@/lib/db';
import Link from 'next/link';

interface pageProps {
  params: {
    branchId: string;
    class: string;
  };
}

const getStudents = async (branchId: string, studentClass: any) => {
  const students = db.student.findMany({
    where: {
      branchId,
      class: studentClass,
    },
    select: {
      id: true,
      name: true,
      gender: true,
      mobileNo: true,
    },
  });
  return students;
};

const page = async ({ params }: pageProps) => {
  const students = await getStudents(params.branchId, params.class);
  return (
    <div>
      <h2 className="text-3xl">Class: {params.class}</h2>
      {students &&
        students.map((student) => (
          <div key={student.id}>
            <Link href={`/student/${params.branchId}/${student.id}`}>
              <p>{student.name}</p>
              <p>{student.gender} </p>
              <p>{String(student.mobileNo)}</p>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default page;
