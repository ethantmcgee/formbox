export enum AuthenticationState {
  MFA_NEEDED = "MFA_NEEDED",
  PASSWORD_CHANGE_REQUIRED = "PASSWORD_CHANGE_REQUIRED",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED"
}

export class LoginResponse {
  state: AuthenticationState | null = null;
  passwordResetToken: string | null = null;
  twoFactorAuthToken: string | null = null;
  authToken: string | null = null;
  refreshToken: string | null = null;
}