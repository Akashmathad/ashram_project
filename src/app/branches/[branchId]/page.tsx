import BackButton from '@/components/BackButton';
import DeleteBranch from '@/components/DeleteBranch';
import { Button, buttonVariants } from '@/components/ui/button';
import { db } from '@/lib/db';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC } from 'react';

interface pageProps {
  params: {
    branchId: string;
  };
}

const getBranch = async (id: string) => {
  const branchDetails = await db.branch.findFirst({
    where: {
      id,
    },
  });

  const totalStudentCount = await db.student.count({
    where: {
      branchId: id,
    },
  });

  const studentCounts = await db.student.groupBy({
    by: ['class'],
    _count: {
      class: true,
    },
    where: {
      branchId: id,
    },
  });

  return { branchDetails, studentCounts, totalStudentCount };
};

const page = async ({ params }: pageProps) => {
  const { branchId } = params;
  const { branchDetails, studentCounts, totalStudentCount } = await getBranch(
    branchId
  );
  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
        <h1 className="text-4xl lg:text-5xl text-center lg:text-left leading-[1.3]">
          {branchDetails?.name} ({totalStudentCount})
        </h1>

        <div className="flex gap-4 w-full lg:w-fit">
          <BackButton path="/branches" />
          <DeleteBranch
            branchId={branchId}
            branchName={branchDetails?.name || ''}
          />
          <Link
            href={`${branchId}/addStudent`}
            className={cn('w-full', buttonVariants())}
          >
            Add Student
          </Link>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {studentCounts.map((count) => (
          <div key={count.class}>
            <Link
              href={`/branches/${branchId}/${count.class}`}
              className="p-8 flex flex-col gap-2 justify-center items-center bg-card border rounded-md hover:scale-[1.05] duration-300 shadow-md"
            >
              <p className="text-3xl font-bold tracking-wide">{count.class}</p>
              <p className="text-xl">Students: {count._count.class}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
