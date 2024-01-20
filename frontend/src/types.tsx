export enum AuthenticationState {
  MFA_NEEDED = "MFA_NEEDED",
  PASSWORD_CHANGE_REQUIRED = "PASSWORD_CHANGE_REQUIRED",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED"
}

export enum ChangeUsernameState {
  SUCCESS = "SUCCESS",
  USERNAME_ALREADY_IN_USE = "USERNAME_ALREADY_IN_USE"
}

export enum ChangeEmailState {
  SUCCESS = "SUCCESS",
  EMAIL_ALREADY_IN_USE = "EMAIL_ALREADY_IN_USE"
}

export class LoginResponse {
  state: AuthenticationState | null = null;
  passwordResetToken: string | null = null;
  twoFactorAuthToken: string | null = null;
  authToken: string | null = null;
  refreshToken: string | null = null;
}

export class GetUserResponse {
  username: string | null = null;
  email: string | null = null;
}

export class CheckAvailabilityResponse {
  available: boolean | null = null;
}

export class ChangeUsernameResponse {
  state: ChangeUsernameState | null = null;
}

export class ChangeEmailResponse {
  state: ChangeEmailState | null = null;
}