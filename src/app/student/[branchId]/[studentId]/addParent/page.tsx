import { FC } from 'react';

interface pageProps {
  params: {
    branchId: string;
    studentId: string;
  };
}

const Page: FC<pageProps> = ({ params }) => {
  return <div>page</div>;
};

export default Page;
