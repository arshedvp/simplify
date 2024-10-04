import SignInForm from '@/components/SignInForm';

export default function SignIn() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-6">Sign In to Telecom App</h1>
      <SignInForm />
    </main>
  );
}
