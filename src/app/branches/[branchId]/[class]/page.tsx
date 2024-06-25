import BackButton from '@/components/BackButton';
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
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
        <h1 className="text-4xl lg:text-5xl text-center lg:text-left leading-[1.3]">
          Class - {params.class} ({students.length})
        </h1>

        <div className="flex gap-4 w-full lg:w-fit">
          <BackButton path={`/branches/${params.branchId}`} />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {students &&
          students.map((student) => (
            <div key={student.id}>
              <Link
                href={`/student/${params.branchId}/${student.id}`}
                className="p-8 flex flex-col gap-1 justify-center items-center bg-card border rounded-md hover:scale-[1.05] duration-300 shadow-md"
              >
                <p className="text-3xl font-bold tracking-wide">
                  {student.name}
                </p>
                <p className="text-xl">{student.gender} </p>
                <p className="text-xl">{String(student.mobileNo)}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default page;
