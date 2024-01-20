import AuthGuard from '../components/AuthGuard'
import ChangeUsername from '../components/settings/ChangeUsername'
import ChangeEmail from '../components/settings/ChangeEmail'

export default function Settings() {
  return (
    <AuthGuard>
      <div className="container mx-auto">
        <ChangeUsername/>
        <hr />
        <ChangeEmail/>
        <hr />
      </div>
    </AuthGuard>
  );
}