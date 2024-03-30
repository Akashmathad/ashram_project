import { Button } from '@/components/ui/button';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const getBranches = async () => {
  const branches = await db.branch.findMany();
  return branches;
};

const page = async () => {
  const session = await getAuthSession();
  const branches = await getBranches();
  console.log(branches);

  if (!session?.user) {
    redirect('/');
  }

  return (
    <div>
      {branches &&
        branches.map((branch) => (
          <Link key={branch.id} href={`/branches/${branch.id}`}>
            {branch.place}
          </Link>
        ))}
      <Link href="/branches/addBranch">
        <Button>Add Branch</Button>
      </Link>
    </div>
  );
};

export default page;
