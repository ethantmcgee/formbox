import AuthGuard from '../components/AuthGuard'
import ChangeUsername from '../components/settings/ChangeUsername'
import ChangeEmail from '../components/settings/ChangeEmail'
import ChangePassword from '../components/settings/ChangePassword'

export default function Settings() {
  return (
    <AuthGuard>
      <div className="container mx-auto">
        <div className="grid grid-cols-2">
          <div className="p-3">
            <ChangeUsername/>
          </div>
          <div className="p-3">
            <ChangeEmail/>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-1">
          <div className="p-3">
            <ChangePassword/>
          </div>
        </div>
        <hr />
      </div>
    </AuthGuard>
  );
}