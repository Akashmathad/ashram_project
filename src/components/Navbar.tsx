import { HomeIcon } from 'lucide-react';
import { ModeToggle } from './ModeToggle';

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
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
