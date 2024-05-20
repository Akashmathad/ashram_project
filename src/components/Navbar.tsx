import { HomeIcon } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div>
      <div className="py-5 px-8 border-b border-zinc-300 dark:border-zinc-700 flex justify-between items-center">
        <h2 className="flex gap-2 text-2xl font-bold items-center">
          <span>
            <HomeIcon className="text-primary" strokeWidth={1.5} size={32} />
          </span>
          Arsha Vidya
        </h2>
        <div className="flex items-center justify-center gap-3">
          <Link href="/branches/addUser">
            <Button>Add User</Button>
          </Link>

          <Link href="/branches/removeUser">
            <Button>Remove User</Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
