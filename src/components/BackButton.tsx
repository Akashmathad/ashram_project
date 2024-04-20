'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      type="button"
      onClick={() => router.back()}
      variant="secondary"
      className="w-full"
    >
      Back
    </Button>
  );
};

export default BackButton;
