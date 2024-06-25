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

  if (!session?.user) {
    redirect('/');
  }

  if (branches.length === 0) {
    return <h1 className="mt-20 text-center text-4xl">No Branches found</h1>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4  gap-6 container py-16">
      {branches &&
        branches.map((branch) => (
          <Link
            key={branch.id}
            href={`branches/${branch.id}`}
            className="h-full w-full"
          >
            <div className="flex flex-col gap-1 p-4 rounded-md border border-border bg-card shadow-sm h-full w-full">
              <p className="text-2xl font-semibold text-center text-primary mb-2">
                {branch.name}
              </p>
              <p>
                <span className="text-muted-foreground font-bold">Head :</span>{' '}
                {branch.head}
              </p>
              <p>
                <span className="text-muted-foreground font-bold">
                  Contact No :
                </span>{' '}
                {branch.contact}
              </p>
              <p>
                <span className="text-muted-foreground font-bold">
                  Address :
                </span>{' '}
                {branch.address}
              </p>
              <p>
                <span className="text-muted-foreground font-bold">
                  Pincode :
                </span>{' '}
                {branch.pincode}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default page;
