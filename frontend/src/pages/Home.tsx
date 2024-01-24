import AuthGuard from '../components/AuthGuard'

export default function Home() {
  return (
    <AuthGuard>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold underline">
          Forms
        </h1>
      </div>
    </AuthGuard>
  );
}