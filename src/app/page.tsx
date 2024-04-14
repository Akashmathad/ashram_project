import LoginForm from '@/components/LoginForm';
import { ModeToggle } from '@/components/ModeToggle';
import { redirect } from 'next/navigation';

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black/30">
      <LoginForm />
    </div>
  );
}
