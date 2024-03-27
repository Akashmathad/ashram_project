import { getAuthSession } from '@/lib/auth';

const page = async () => {
  const session = await getAuthSession();
  return <div>page</div>;
};

export default page;
