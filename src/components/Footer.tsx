import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <div className="py-5 px-8 border-t border-zinc-300 dark:border-zinc-700 flex justify-between items-center">
      <h2 className="flex gap-2 text-xl font-bold items-center">
        <span>
          <HomeIcon className="text-primary" strokeWidth={1.5} size={28} />
        </span>
      </h2>
      <p className="text-accent-foreground hidden lg:block">
        &copy; {new Date().getFullYear()}. All rights reserved.
      </p>

      <Link href="/branches/addBranch">
        <Button>Add Branch</Button>
      </Link>
    </div>
  );
};

export default Footer;
