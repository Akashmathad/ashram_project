import LoginForm from '@/components/LoginForm';

export default async function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black/30">
      <LoginForm />
    </div>
  );
}
