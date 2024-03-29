import { Button } from '@/components/ui/button';
import { getAuthSession } from '@/lib/auth';
import Link from 'next/link';

const page = async () => {
  const session = await getAuthSession();

  return (
    <div>
      <Link href="/branches/addBranch">
        <Button>Add Branch</Button>
      </Link>
    </div>
  );
};

export default page;
