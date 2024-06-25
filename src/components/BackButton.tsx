'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

const BackButton = ({ path }: { path: string }) => {
  const router = useRouter();
  return (
    <Button
      type="button"
      onClick={() => router.push(path)}
      variant="secondary"
      className="w-full"
    >
      Back
    </Button>
  );
};

export default BackButton;
