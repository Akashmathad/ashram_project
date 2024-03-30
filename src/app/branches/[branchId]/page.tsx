import { buttonVariants } from '@/components/ui/button';
import { db } from '@/lib/db';
import Link from 'next/link';
import { FC } from 'react';

interface pageProps {
  params: {
    branchId: string;
  };
}

const getBranch = async (id: string) => {
  const branchDetails = await db.branch.findUnique({
    where: {
      id,
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

  return { branchDetails, studentCounts };
};

const page = async ({ params }: pageProps) => {
  const { branchId } = params;
  const { branchDetails, studentCounts } = await getBranch(branchId);
  console.log(branchDetails, studentCounts);
  return (
    <div>
      {branchDetails?.name}
      <Link href={`${branchId}/addStudent`} className={buttonVariants()}>
        Add Student
      </Link>
      {studentCounts.map((count) => (
        <div key={count.class}>
          <Link href={`/branches/${branchId}/${count.class}`}>
            <p>{count.class}</p>
            <p>{count._count.class}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default page;
