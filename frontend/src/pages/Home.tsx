import AuthGuard from '../components/AuthGuard'
import ManageForms from '../components/form/ManageForms'

export default function Users() {
  return (
    <AuthGuard>
      <ManageForms />
    </AuthGuard>
  );
}