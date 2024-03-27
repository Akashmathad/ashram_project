import LoginForm from '@/components/LoginForm';
import { redirect } from 'next/navigation';

export default function Home() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
