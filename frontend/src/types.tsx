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

export enum ChangePasswordState {
  SUCCESS = "SUCCESS",
  CURRENT_PASSWORD_INCORRECT = "CURRENT_PASSWORD_INCORRECT",
  NEW_PASSWORD_INSECURE = "NEW_PASSWORD_INSECURE"
}

export enum TwoFactorType {
  TOTP = 'TOTP',
  SMS = 'SMS',
  EMAIL = 'EMAIL'
}

export enum TwoFactorSaveState {
  SUCCESS = "SUCCESS",
  SMS_NOT_ENABLED = "SMS_NOT_ENABLED",
  CODE_INCORRECT = "CODE_INCORRECT",
  CANNOT_UPDATE = "CANNOT_UPDATE"
}

export enum DeleteTwoFactorState {
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

export class ChangePasswordResponse {
  state: ChangePasswordState | null = null;
}

export class TwoFactorOption {
  state: TwoFactorSaveState | null = null;
  id: number | null = null;
  nickname: string | null = null;
  twoFactorType: TwoFactorType | null = null;
  target: string | null = null;
  code: string | null = null;
}

export class MFAOption {
  id: number | null = null;
  nickname: string | null = null;
  type: TwoFactorType | null = null;
  preview: string | null = null;
}

export class DeleteTwoFactorResponse {
  state: DeleteTwoFactorState | null = null;
}