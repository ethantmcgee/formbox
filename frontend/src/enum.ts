/* eslint-disable */

export const protobufPackage = "";

export enum AuthenticationState {
  AUTH_STATE_UNSPECIFIED = 0,
  AUTH_STATE_MFA_NEEDED = 1,
  AUTH_STATE_PASSWORD_CHANGE_REQUIRED = 2,
  AUTH_STATE_SUCCESS = 3,
  AUTH_STATE_FAILED = 4,
  UNRECOGNIZED = -1,
}

export function authenticationStateFromJSON(object: any): AuthenticationState {
  switch (object) {
    case 0:
    case "AUTH_STATE_UNSPECIFIED":
      return AuthenticationState.AUTH_STATE_UNSPECIFIED;
    case 1:
    case "AUTH_STATE_MFA_NEEDED":
      return AuthenticationState.AUTH_STATE_MFA_NEEDED;
    case 2:
    case "AUTH_STATE_PASSWORD_CHANGE_REQUIRED":
      return AuthenticationState.AUTH_STATE_PASSWORD_CHANGE_REQUIRED;
    case 3:
    case "AUTH_STATE_SUCCESS":
      return AuthenticationState.AUTH_STATE_SUCCESS;
    case 4:
    case "AUTH_STATE_FAILED":
      return AuthenticationState.AUTH_STATE_FAILED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AuthenticationState.UNRECOGNIZED;
  }
}

export function authenticationStateToJSON(object: AuthenticationState): string {
  switch (object) {
    case AuthenticationState.AUTH_STATE_UNSPECIFIED:
      return "AUTH_STATE_UNSPECIFIED";
    case AuthenticationState.AUTH_STATE_MFA_NEEDED:
      return "AUTH_STATE_MFA_NEEDED";
    case AuthenticationState.AUTH_STATE_PASSWORD_CHANGE_REQUIRED:
      return "AUTH_STATE_PASSWORD_CHANGE_REQUIRED";
    case AuthenticationState.AUTH_STATE_SUCCESS:
      return "AUTH_STATE_SUCCESS";
    case AuthenticationState.AUTH_STATE_FAILED:
      return "AUTH_STATE_FAILED";
    case AuthenticationState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ChangeUsernameState {
  CHANGE_USERNAME_UNSPECIFIED = 0,
  CHANGE_USERNAME_SUCCESS = 1,
  CHANGE_USERNAME_USERNAME_ALREADY_IN_USE = 2,
  UNRECOGNIZED = -1,
}

export function changeUsernameStateFromJSON(object: any): ChangeUsernameState {
  switch (object) {
    case 0:
    case "CHANGE_USERNAME_UNSPECIFIED":
      return ChangeUsernameState.CHANGE_USERNAME_UNSPECIFIED;
    case 1:
    case "CHANGE_USERNAME_SUCCESS":
      return ChangeUsernameState.CHANGE_USERNAME_SUCCESS;
    case 2:
    case "CHANGE_USERNAME_USERNAME_ALREADY_IN_USE":
      return ChangeUsernameState.CHANGE_USERNAME_USERNAME_ALREADY_IN_USE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ChangeUsernameState.UNRECOGNIZED;
  }
}

export function changeUsernameStateToJSON(object: ChangeUsernameState): string {
  switch (object) {
    case ChangeUsernameState.CHANGE_USERNAME_UNSPECIFIED:
      return "CHANGE_USERNAME_UNSPECIFIED";
    case ChangeUsernameState.CHANGE_USERNAME_SUCCESS:
      return "CHANGE_USERNAME_SUCCESS";
    case ChangeUsernameState.CHANGE_USERNAME_USERNAME_ALREADY_IN_USE:
      return "CHANGE_USERNAME_USERNAME_ALREADY_IN_USE";
    case ChangeUsernameState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ChangeEmailState {
  CHANGE_EMAIL_UNSPECIFIED = 0,
  CHANGE_EMAIL_SUCCESS = 1,
  CHANGE_EMAIL_EMAIL_ALREADY_IN_USE = 2,
  UNRECOGNIZED = -1,
}

export function changeEmailStateFromJSON(object: any): ChangeEmailState {
  switch (object) {
    case 0:
    case "CHANGE_EMAIL_UNSPECIFIED":
      return ChangeEmailState.CHANGE_EMAIL_UNSPECIFIED;
    case 1:
    case "CHANGE_EMAIL_SUCCESS":
      return ChangeEmailState.CHANGE_EMAIL_SUCCESS;
    case 2:
    case "CHANGE_EMAIL_EMAIL_ALREADY_IN_USE":
      return ChangeEmailState.CHANGE_EMAIL_EMAIL_ALREADY_IN_USE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ChangeEmailState.UNRECOGNIZED;
  }
}

export function changeEmailStateToJSON(object: ChangeEmailState): string {
  switch (object) {
    case ChangeEmailState.CHANGE_EMAIL_UNSPECIFIED:
      return "CHANGE_EMAIL_UNSPECIFIED";
    case ChangeEmailState.CHANGE_EMAIL_SUCCESS:
      return "CHANGE_EMAIL_SUCCESS";
    case ChangeEmailState.CHANGE_EMAIL_EMAIL_ALREADY_IN_USE:
      return "CHANGE_EMAIL_EMAIL_ALREADY_IN_USE";
    case ChangeEmailState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ChangePasswordState {
  CHANGE_PASSWORD_UNSPECIFIED = 0,
  CHANGE_PASSWORD_SUCCESS = 1,
  CHANGE_PASSWORD_CURRENT_PASSWORD_INCORRECT = 2,
  CHANGE_PASSWORD_NEW_PASSWORD_INSECURE = 3,
  UNRECOGNIZED = -1,
}

export function changePasswordStateFromJSON(object: any): ChangePasswordState {
  switch (object) {
    case 0:
    case "CHANGE_PASSWORD_UNSPECIFIED":
      return ChangePasswordState.CHANGE_PASSWORD_UNSPECIFIED;
    case 1:
    case "CHANGE_PASSWORD_SUCCESS":
      return ChangePasswordState.CHANGE_PASSWORD_SUCCESS;
    case 2:
    case "CHANGE_PASSWORD_CURRENT_PASSWORD_INCORRECT":
      return ChangePasswordState.CHANGE_PASSWORD_CURRENT_PASSWORD_INCORRECT;
    case 3:
    case "CHANGE_PASSWORD_NEW_PASSWORD_INSECURE":
      return ChangePasswordState.CHANGE_PASSWORD_NEW_PASSWORD_INSECURE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ChangePasswordState.UNRECOGNIZED;
  }
}

export function changePasswordStateToJSON(object: ChangePasswordState): string {
  switch (object) {
    case ChangePasswordState.CHANGE_PASSWORD_UNSPECIFIED:
      return "CHANGE_PASSWORD_UNSPECIFIED";
    case ChangePasswordState.CHANGE_PASSWORD_SUCCESS:
      return "CHANGE_PASSWORD_SUCCESS";
    case ChangePasswordState.CHANGE_PASSWORD_CURRENT_PASSWORD_INCORRECT:
      return "CHANGE_PASSWORD_CURRENT_PASSWORD_INCORRECT";
    case ChangePasswordState.CHANGE_PASSWORD_NEW_PASSWORD_INSECURE:
      return "CHANGE_PASSWORD_NEW_PASSWORD_INSECURE";
    case ChangePasswordState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum TwoFactorType {
  TWO_FACTOR_UNSPECIFIED = 0,
  TWO_FACTOR_TOTP = 1,
  TWO_FACTOR_SMS = 2,
  TWO_FACTOR_EMAIL = 3,
  UNRECOGNIZED = -1,
}

export function twoFactorTypeFromJSON(object: any): TwoFactorType {
  switch (object) {
    case 0:
    case "TWO_FACTOR_UNSPECIFIED":
      return TwoFactorType.TWO_FACTOR_UNSPECIFIED;
    case 1:
    case "TWO_FACTOR_TOTP":
      return TwoFactorType.TWO_FACTOR_TOTP;
    case 2:
    case "TWO_FACTOR_SMS":
      return TwoFactorType.TWO_FACTOR_SMS;
    case 3:
    case "TWO_FACTOR_EMAIL":
      return TwoFactorType.TWO_FACTOR_EMAIL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TwoFactorType.UNRECOGNIZED;
  }
}

export function twoFactorTypeToJSON(object: TwoFactorType): string {
  switch (object) {
    case TwoFactorType.TWO_FACTOR_UNSPECIFIED:
      return "TWO_FACTOR_UNSPECIFIED";
    case TwoFactorType.TWO_FACTOR_TOTP:
      return "TWO_FACTOR_TOTP";
    case TwoFactorType.TWO_FACTOR_SMS:
      return "TWO_FACTOR_SMS";
    case TwoFactorType.TWO_FACTOR_EMAIL:
      return "TWO_FACTOR_EMAIL";
    case TwoFactorType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum TwoFactorSaveState {
  TWO_FACTOR_SAVE_UNSPECIFIED = 0,
  TWO_FACTOR_SAVE_SUCCESS = 1,
  TWO_FACTOR_SAVE_SMS_NOT_ENABLED = 2,
  TWO_FACTOR_SAVE_CODE_INCORRECT = 3,
  TWO_FACTOR_SAVE_CANNOT_UPDATE = 4,
  UNRECOGNIZED = -1,
}

export function twoFactorSaveStateFromJSON(object: any): TwoFactorSaveState {
  switch (object) {
    case 0:
    case "TWO_FACTOR_SAVE_UNSPECIFIED":
      return TwoFactorSaveState.TWO_FACTOR_SAVE_UNSPECIFIED;
    case 1:
    case "TWO_FACTOR_SAVE_SUCCESS":
      return TwoFactorSaveState.TWO_FACTOR_SAVE_SUCCESS;
    case 2:
    case "TWO_FACTOR_SAVE_SMS_NOT_ENABLED":
      return TwoFactorSaveState.TWO_FACTOR_SAVE_SMS_NOT_ENABLED;
    case 3:
    case "TWO_FACTOR_SAVE_CODE_INCORRECT":
      return TwoFactorSaveState.TWO_FACTOR_SAVE_CODE_INCORRECT;
    case 4:
    case "TWO_FACTOR_SAVE_CANNOT_UPDATE":
      return TwoFactorSaveState.TWO_FACTOR_SAVE_CANNOT_UPDATE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TwoFactorSaveState.UNRECOGNIZED;
  }
}

export function twoFactorSaveStateToJSON(object: TwoFactorSaveState): string {
  switch (object) {
    case TwoFactorSaveState.TWO_FACTOR_SAVE_UNSPECIFIED:
      return "TWO_FACTOR_SAVE_UNSPECIFIED";
    case TwoFactorSaveState.TWO_FACTOR_SAVE_SUCCESS:
      return "TWO_FACTOR_SAVE_SUCCESS";
    case TwoFactorSaveState.TWO_FACTOR_SAVE_SMS_NOT_ENABLED:
      return "TWO_FACTOR_SAVE_SMS_NOT_ENABLED";
    case TwoFactorSaveState.TWO_FACTOR_SAVE_CODE_INCORRECT:
      return "TWO_FACTOR_SAVE_CODE_INCORRECT";
    case TwoFactorSaveState.TWO_FACTOR_SAVE_CANNOT_UPDATE:
      return "TWO_FACTOR_SAVE_CANNOT_UPDATE";
    case TwoFactorSaveState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum DeleteTwoFactorState {
  DELETE_TWO_FACTOR_UNSPECIFIED = 0,
  DELETE_TWO_FACTOR_SUCCESS = 1,
  DELETE_TWO_FACTOR_FAILED = 2,
  UNRECOGNIZED = -1,
}

export function deleteTwoFactorStateFromJSON(object: any): DeleteTwoFactorState {
  switch (object) {
    case 0:
    case "DELETE_TWO_FACTOR_UNSPECIFIED":
      return DeleteTwoFactorState.DELETE_TWO_FACTOR_UNSPECIFIED;
    case 1:
    case "DELETE_TWO_FACTOR_SUCCESS":
      return DeleteTwoFactorState.DELETE_TWO_FACTOR_SUCCESS;
    case 2:
    case "DELETE_TWO_FACTOR_FAILED":
      return DeleteTwoFactorState.DELETE_TWO_FACTOR_FAILED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DeleteTwoFactorState.UNRECOGNIZED;
  }
}

export function deleteTwoFactorStateToJSON(object: DeleteTwoFactorState): string {
  switch (object) {
    case DeleteTwoFactorState.DELETE_TWO_FACTOR_UNSPECIFIED:
      return "DELETE_TWO_FACTOR_UNSPECIFIED";
    case DeleteTwoFactorState.DELETE_TWO_FACTOR_SUCCESS:
      return "DELETE_TWO_FACTOR_SUCCESS";
    case DeleteTwoFactorState.DELETE_TWO_FACTOR_FAILED:
      return "DELETE_TWO_FACTOR_FAILED";
    case DeleteTwoFactorState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ProtectionType {
  PROTECTION_TYPE_UNSPECIFIED = 0,
  PROTECTION_TYPE_NONE = 1,
  PROTECTION_TYPE_HCAPTCHA = 2,
  PROTECTION_TYPE_RECAPTCHA = 3,
  UNRECOGNIZED = -1,
}

export function protectionTypeFromJSON(object: any): ProtectionType {
  switch (object) {
    case 0:
    case "PROTECTION_TYPE_UNSPECIFIED":
      return ProtectionType.PROTECTION_TYPE_UNSPECIFIED;
    case 1:
    case "PROTECTION_TYPE_NONE":
      return ProtectionType.PROTECTION_TYPE_NONE;
    case 2:
    case "PROTECTION_TYPE_HCAPTCHA":
      return ProtectionType.PROTECTION_TYPE_HCAPTCHA;
    case 3:
    case "PROTECTION_TYPE_RECAPTCHA":
      return ProtectionType.PROTECTION_TYPE_RECAPTCHA;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProtectionType.UNRECOGNIZED;
  }
}

export function protectionTypeToJSON(object: ProtectionType): string {
  switch (object) {
    case ProtectionType.PROTECTION_TYPE_UNSPECIFIED:
      return "PROTECTION_TYPE_UNSPECIFIED";
    case ProtectionType.PROTECTION_TYPE_NONE:
      return "PROTECTION_TYPE_NONE";
    case ProtectionType.PROTECTION_TYPE_HCAPTCHA:
      return "PROTECTION_TYPE_HCAPTCHA";
    case ProtectionType.PROTECTION_TYPE_RECAPTCHA:
      return "PROTECTION_TYPE_RECAPTCHA";
    case ProtectionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum NotificationType {
  NOTIFICATION_TYPE_UNSPECIFIED = 0,
  NOTIFICATION_TYPE_NONE = 1,
  NOTIFICATION_TYPE_IMMEDIATE = 2,
  NOTIFICATION_TYPE_DIGEST = 3,
  UNRECOGNIZED = -1,
}

export function notificationTypeFromJSON(object: any): NotificationType {
  switch (object) {
    case 0:
    case "NOTIFICATION_TYPE_UNSPECIFIED":
      return NotificationType.NOTIFICATION_TYPE_UNSPECIFIED;
    case 1:
    case "NOTIFICATION_TYPE_NONE":
      return NotificationType.NOTIFICATION_TYPE_NONE;
    case 2:
    case "NOTIFICATION_TYPE_IMMEDIATE":
      return NotificationType.NOTIFICATION_TYPE_IMMEDIATE;
    case 3:
    case "NOTIFICATION_TYPE_DIGEST":
      return NotificationType.NOTIFICATION_TYPE_DIGEST;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NotificationType.UNRECOGNIZED;
  }
}

export function notificationTypeToJSON(object: NotificationType): string {
  switch (object) {
    case NotificationType.NOTIFICATION_TYPE_UNSPECIFIED:
      return "NOTIFICATION_TYPE_UNSPECIFIED";
    case NotificationType.NOTIFICATION_TYPE_NONE:
      return "NOTIFICATION_TYPE_NONE";
    case NotificationType.NOTIFICATION_TYPE_IMMEDIATE:
      return "NOTIFICATION_TYPE_IMMEDIATE";
    case NotificationType.NOTIFICATION_TYPE_DIGEST:
      return "NOTIFICATION_TYPE_DIGEST";
    case NotificationType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum DayPart {
  DAY_PART_UNSPECIFIED = 0,
  DAY_PART_AM = 1,
  DAY_PART_PM = 2,
  UNRECOGNIZED = -1,
}

export function dayPartFromJSON(object: any): DayPart {
  switch (object) {
    case 0:
    case "DAY_PART_UNSPECIFIED":
      return DayPart.DAY_PART_UNSPECIFIED;
    case 1:
    case "DAY_PART_AM":
      return DayPart.DAY_PART_AM;
    case 2:
    case "DAY_PART_PM":
      return DayPart.DAY_PART_PM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DayPart.UNRECOGNIZED;
  }
}

export function dayPartToJSON(object: DayPart): string {
  switch (object) {
    case DayPart.DAY_PART_UNSPECIFIED:
      return "DAY_PART_UNSPECIFIED";
    case DayPart.DAY_PART_AM:
      return "DAY_PART_AM";
    case DayPart.DAY_PART_PM:
      return "DAY_PART_PM";
    case DayPart.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
