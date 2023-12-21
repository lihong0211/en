import { BtnMedGPTLogout } from 'ui';

import { useLoginUser, useUserInfoStore } from '@/store';

export default function BtnLogout() {
  const { loginUser, setCurrentRole, currentRole } = useLoginUser();
  const { logout } = useUserInfoStore();
  if (!loginUser) return <></>;

  return (
    <>
      <BtnMedGPTLogout
        loginUser={loginUser}
        setCurrentRole={setCurrentRole}
        logout={logout}
        currentRole={currentRole}
      />
    </>
  );
}
