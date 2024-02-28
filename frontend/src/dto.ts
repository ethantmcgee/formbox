/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import {
  AuthenticationState,
  authenticationStateFromJSON,
  authenticationStateToJSON,
  ChangeEmailState,
  changeEmailStateFromJSON,
  changeEmailStateToJSON,
  ChangePasswordState,
  changePasswordStateFromJSON,
  changePasswordStateToJSON,
  ChangeUsernameState,
  changeUsernameStateFromJSON,
  changeUsernameStateToJSON,
  DayPart,
  dayPartFromJSON,
  dayPartToJSON,
  DeleteTwoFactorState,
  deleteTwoFactorStateFromJSON,
  deleteTwoFactorStateToJSON,
  NotificationType,
  notificationTypeFromJSON,
  notificationTypeToJSON,
  ProtectionType,
  protectionTypeFromJSON,
  protectionTypeToJSON,
  TwoFactorSaveState,
  twoFactorSaveStateFromJSON,
  twoFactorSaveStateToJSON,
  TwoFactorType,
  twoFactorTypeFromJSON,
  twoFactorTypeToJSON,
} from "./enum";

export const protobufPackage = "";

export interface LoginResponse {
  state: AuthenticationState;
  passwordResetToken: string;
  twoFactorAuthToken: string;
  authToken: string;
  refreshToken: string;
}

export interface GetUserResponse {
  username: string;
  email: string;
}

export interface CheckAvailabilityResponse {
  available: boolean;
}

export interface ChangeUsernameResponse {
  state: ChangeUsernameState;
}

export interface ChangeEmailResponse {
  state: ChangeEmailState;
}

export interface ChangePasswordResponse {
  state: ChangePasswordState;
}

export interface TwoFactorOption {
  state: TwoFactorSaveState;
  id: number;
  nickname: string;
  twoFactorType: TwoFactorType;
  target: string;
  code: string;
}

export interface MFAOption {
  id: number;
  nickname: string;
  type: TwoFactorType;
  preview: string;
}

export interface DeleteTwoFactorResponse {
  state: DeleteTwoFactorState;
}

export interface ApiUser {
  id: number;
  username: string;
  email: string;
}

export interface PageableApiUser {
  total: number;
  results: ApiUser[];
}

export interface ApiForm {
  id: number;
  name: string;
  slug: string;
  protectionType: ProtectionType;
  protectionKey: string;
  notificationType: NotificationType;
  digestTime: number;
  digestDayPart: DayPart;
  domains: string[];
  notifications: string[];
}

export interface PageableApiForm {
  total: number;
  results: ApiForm[];
}

function createBaseLoginResponse(): LoginResponse {
  return { state: 0, passwordResetToken: "", twoFactorAuthToken: "", authToken: "", refreshToken: "" };
}

export const LoginResponse = {
  encode(message: LoginResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.state !== 0) {
      writer.uint32(8).int32(message.state);
    }
    if (message.passwordResetToken !== "") {
      writer.uint32(18).string(message.passwordResetToken);
    }
    if (message.twoFactorAuthToken !== "") {
      writer.uint32(26).string(message.twoFactorAuthToken);
    }
    if (message.authToken !== "") {
      writer.uint32(34).string(message.authToken);
    }
    if (message.refreshToken !== "") {
      writer.uint32(42).string(message.refreshToken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.passwordResetToken = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.twoFactorAuthToken = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.authToken = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.refreshToken = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LoginResponse {
    return {
      state: isSet(object.state) ? authenticationStateFromJSON(object.state) : 0,
      passwordResetToken: isSet(object.passwordResetToken) ? globalThis.String(object.passwordResetToken) : "",
      twoFactorAuthToken: isSet(object.twoFactorAuthToken) ? globalThis.String(object.twoFactorAuthToken) : "",
      authToken: isSet(object.authToken) ? globalThis.String(object.authToken) : "",
      refreshToken: isSet(object.refreshToken) ? globalThis.String(object.refreshToken) : "",
    };
  },

  toJSON(message: LoginResponse): unknown {
    const obj: any = {};
    if (message.state !== 0) {
      obj.state = authenticationStateToJSON(message.state);
    }
    if (message.passwordResetToken !== "") {
      obj.passwordResetToken = message.passwordResetToken;
    }
    if (message.twoFactorAuthToken !== "") {
      obj.twoFactorAuthToken = message.twoFactorAuthToken;
    }
    if (message.authToken !== "") {
      obj.authToken = message.authToken;
    }
    if (message.refreshToken !== "") {
      obj.refreshToken = message.refreshToken;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LoginResponse>, I>>(base?: I): LoginResponse {
    return LoginResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LoginResponse>, I>>(object: I): LoginResponse {
    const message = createBaseLoginResponse();
    message.state = object.state ?? 0;
    message.passwordResetToken = object.passwordResetToken ?? "";
    message.twoFactorAuthToken = object.twoFactorAuthToken ?? "";
    message.authToken = object.authToken ?? "";
    message.refreshToken = object.refreshToken ?? "";
    return message;
  },
};

function createBaseGetUserResponse(): GetUserResponse {
  return { username: "", email: "" };
}

export const GetUserResponse = {
  encode(message: GetUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetUserResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.username = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.email = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetUserResponse {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
    };
  },

  toJSON(message: GetUserResponse): unknown {
    const obj: any = {};
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetUserResponse>, I>>(base?: I): GetUserResponse {
    return GetUserResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetUserResponse>, I>>(object: I): GetUserResponse {
    const message = createBaseGetUserResponse();
    message.username = object.username ?? "";
    message.email = object.email ?? "";
    return message;
  },
};

function createBaseCheckAvailabilityResponse(): CheckAvailabilityResponse {
  return { available: false };
}

export const CheckAvailabilityResponse = {
  encode(message: CheckAvailabilityResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.available === true) {
      writer.uint32(8).bool(message.available);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CheckAvailabilityResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCheckAvailabilityResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.available = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CheckAvailabilityResponse {
    return { available: isSet(object.available) ? globalThis.Boolean(object.available) : false };
  },

  toJSON(message: CheckAvailabilityResponse): unknown {
    const obj: any = {};
    if (message.available === true) {
      obj.available = message.available;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CheckAvailabilityResponse>, I>>(base?: I): CheckAvailabilityResponse {
    return CheckAvailabilityResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CheckAvailabilityResponse>, I>>(object: I): CheckAvailabilityResponse {
    const message = createBaseCheckAvailabilityResponse();
    message.available = object.available ?? false;
    return message;
  },
};

function createBaseChangeUsernameResponse(): ChangeUsernameResponse {
  return { state: 0 };
}

export const ChangeUsernameResponse = {
  encode(message: ChangeUsernameResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.state !== 0) {
      writer.uint32(8).int32(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangeUsernameResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangeUsernameResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChangeUsernameResponse {
    return { state: isSet(object.state) ? changeUsernameStateFromJSON(object.state) : 0 };
  },

  toJSON(message: ChangeUsernameResponse): unknown {
    const obj: any = {};
    if (message.state !== 0) {
      obj.state = changeUsernameStateToJSON(message.state);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChangeUsernameResponse>, I>>(base?: I): ChangeUsernameResponse {
    return ChangeUsernameResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChangeUsernameResponse>, I>>(object: I): ChangeUsernameResponse {
    const message = createBaseChangeUsernameResponse();
    message.state = object.state ?? 0;
    return message;
  },
};

function createBaseChangeEmailResponse(): ChangeEmailResponse {
  return { state: 0 };
}

export const ChangeEmailResponse = {
  encode(message: ChangeEmailResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.state !== 0) {
      writer.uint32(8).int32(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangeEmailResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangeEmailResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChangeEmailResponse {
    return { state: isSet(object.state) ? changeEmailStateFromJSON(object.state) : 0 };
  },

  toJSON(message: ChangeEmailResponse): unknown {
    const obj: any = {};
    if (message.state !== 0) {
      obj.state = changeEmailStateToJSON(message.state);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChangeEmailResponse>, I>>(base?: I): ChangeEmailResponse {
    return ChangeEmailResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChangeEmailResponse>, I>>(object: I): ChangeEmailResponse {
    const message = createBaseChangeEmailResponse();
    message.state = object.state ?? 0;
    return message;
  },
};

function createBaseChangePasswordResponse(): ChangePasswordResponse {
  return { state: 0 };
}

export const ChangePasswordResponse = {
  encode(message: ChangePasswordResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.state !== 0) {
      writer.uint32(8).int32(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChangePasswordResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChangePasswordResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChangePasswordResponse {
    return { state: isSet(object.state) ? changePasswordStateFromJSON(object.state) : 0 };
  },

  toJSON(message: ChangePasswordResponse): unknown {
    const obj: any = {};
    if (message.state !== 0) {
      obj.state = changePasswordStateToJSON(message.state);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChangePasswordResponse>, I>>(base?: I): ChangePasswordResponse {
    return ChangePasswordResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChangePasswordResponse>, I>>(object: I): ChangePasswordResponse {
    const message = createBaseChangePasswordResponse();
    message.state = object.state ?? 0;
    return message;
  },
};

function createBaseTwoFactorOption(): TwoFactorOption {
  return { state: 0, id: 0, nickname: "", twoFactorType: 0, target: "", code: "" };
}

export const TwoFactorOption = {
  encode(message: TwoFactorOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.state !== 0) {
      writer.uint32(8).int32(message.state);
    }
    if (message.id !== 0) {
      writer.uint32(16).int32(message.id);
    }
    if (message.nickname !== "") {
      writer.uint32(26).string(message.nickname);
    }
    if (message.twoFactorType !== 0) {
      writer.uint32(32).int32(message.twoFactorType);
    }
    if (message.target !== "") {
      writer.uint32(42).string(message.target);
    }
    if (message.code !== "") {
      writer.uint32(50).string(message.code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TwoFactorOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTwoFactorOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.nickname = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.twoFactorType = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.target = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.code = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TwoFactorOption {
    return {
      state: isSet(object.state) ? twoFactorSaveStateFromJSON(object.state) : 0,
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      nickname: isSet(object.nickname) ? globalThis.String(object.nickname) : "",
      twoFactorType: isSet(object.twoFactorType) ? twoFactorTypeFromJSON(object.twoFactorType) : 0,
      target: isSet(object.target) ? globalThis.String(object.target) : "",
      code: isSet(object.code) ? globalThis.String(object.code) : "",
    };
  },

  toJSON(message: TwoFactorOption): unknown {
    const obj: any = {};
    if (message.state !== 0) {
      obj.state = twoFactorSaveStateToJSON(message.state);
    }
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.nickname !== "") {
      obj.nickname = message.nickname;
    }
    if (message.twoFactorType !== 0) {
      obj.twoFactorType = twoFactorTypeToJSON(message.twoFactorType);
    }
    if (message.target !== "") {
      obj.target = message.target;
    }
    if (message.code !== "") {
      obj.code = message.code;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TwoFactorOption>, I>>(base?: I): TwoFactorOption {
    return TwoFactorOption.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TwoFactorOption>, I>>(object: I): TwoFactorOption {
    const message = createBaseTwoFactorOption();
    message.state = object.state ?? 0;
    message.id = object.id ?? 0;
    message.nickname = object.nickname ?? "";
    message.twoFactorType = object.twoFactorType ?? 0;
    message.target = object.target ?? "";
    message.code = object.code ?? "";
    return message;
  },
};

function createBaseMFAOption(): MFAOption {
  return { id: 0, nickname: "", type: 0, preview: "" };
}

export const MFAOption = {
  encode(message: MFAOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.nickname !== "") {
      writer.uint32(18).string(message.nickname);
    }
    if (message.type !== 0) {
      writer.uint32(24).int32(message.type);
    }
    if (message.preview !== "") {
      writer.uint32(34).string(message.preview);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MFAOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMFAOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nickname = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.preview = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MFAOption {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      nickname: isSet(object.nickname) ? globalThis.String(object.nickname) : "",
      type: isSet(object.type) ? twoFactorTypeFromJSON(object.type) : 0,
      preview: isSet(object.preview) ? globalThis.String(object.preview) : "",
    };
  },

  toJSON(message: MFAOption): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.nickname !== "") {
      obj.nickname = message.nickname;
    }
    if (message.type !== 0) {
      obj.type = twoFactorTypeToJSON(message.type);
    }
    if (message.preview !== "") {
      obj.preview = message.preview;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MFAOption>, I>>(base?: I): MFAOption {
    return MFAOption.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MFAOption>, I>>(object: I): MFAOption {
    const message = createBaseMFAOption();
    message.id = object.id ?? 0;
    message.nickname = object.nickname ?? "";
    message.type = object.type ?? 0;
    message.preview = object.preview ?? "";
    return message;
  },
};

function createBaseDeleteTwoFactorResponse(): DeleteTwoFactorResponse {
  return { state: 0 };
}

export const DeleteTwoFactorResponse = {
  encode(message: DeleteTwoFactorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.state !== 0) {
      writer.uint32(8).int32(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteTwoFactorResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteTwoFactorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteTwoFactorResponse {
    return { state: isSet(object.state) ? deleteTwoFactorStateFromJSON(object.state) : 0 };
  },

  toJSON(message: DeleteTwoFactorResponse): unknown {
    const obj: any = {};
    if (message.state !== 0) {
      obj.state = deleteTwoFactorStateToJSON(message.state);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteTwoFactorResponse>, I>>(base?: I): DeleteTwoFactorResponse {
    return DeleteTwoFactorResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteTwoFactorResponse>, I>>(object: I): DeleteTwoFactorResponse {
    const message = createBaseDeleteTwoFactorResponse();
    message.state = object.state ?? 0;
    return message;
  },
};

function createBaseApiUser(): ApiUser {
  return { id: 0, username: "", email: "" };
}

export const ApiUser = {
  encode(message: ApiUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.username = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.email = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ApiUser {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
    };
  },

  toJSON(message: ApiUser): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ApiUser>, I>>(base?: I): ApiUser {
    return ApiUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ApiUser>, I>>(object: I): ApiUser {
    const message = createBaseApiUser();
    message.id = object.id ?? 0;
    message.username = object.username ?? "";
    message.email = object.email ?? "";
    return message;
  },
};

function createBasePageableApiUser(): PageableApiUser {
  return { total: 0, results: [] };
}

export const PageableApiUser = {
  encode(message: PageableApiUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).int32(message.total);
    }
    for (const v of message.results) {
      ApiUser.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PageableApiUser {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePageableApiUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.total = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.results.push(ApiUser.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PageableApiUser {
    return {
      total: isSet(object.total) ? globalThis.Number(object.total) : 0,
      results: globalThis.Array.isArray(object?.results) ? object.results.map((e: any) => ApiUser.fromJSON(e)) : [],
    };
  },

  toJSON(message: PageableApiUser): unknown {
    const obj: any = {};
    if (message.total !== 0) {
      obj.total = Math.round(message.total);
    }
    if (message.results?.length) {
      obj.results = message.results.map((e) => ApiUser.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PageableApiUser>, I>>(base?: I): PageableApiUser {
    return PageableApiUser.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PageableApiUser>, I>>(object: I): PageableApiUser {
    const message = createBasePageableApiUser();
    message.total = object.total ?? 0;
    message.results = object.results?.map((e) => ApiUser.fromPartial(e)) || [];
    return message;
  },
};

function createBaseApiForm(): ApiForm {
  return {
    id: 0,
    name: "",
    slug: "",
    protectionType: 0,
    protectionKey: "",
    notificationType: 0,
    digestTime: 0,
    digestDayPart: 0,
    domains: [],
    notifications: [],
  };
}

export const ApiForm = {
  encode(message: ApiForm, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.slug !== "") {
      writer.uint32(26).string(message.slug);
    }
    if (message.protectionType !== 0) {
      writer.uint32(32).int32(message.protectionType);
    }
    if (message.protectionKey !== "") {
      writer.uint32(42).string(message.protectionKey);
    }
    if (message.notificationType !== 0) {
      writer.uint32(48).int32(message.notificationType);
    }
    if (message.digestTime !== 0) {
      writer.uint32(56).int32(message.digestTime);
    }
    if (message.digestDayPart !== 0) {
      writer.uint32(64).int32(message.digestDayPart);
    }
    for (const v of message.domains) {
      writer.uint32(74).string(v!);
    }
    for (const v of message.notifications) {
      writer.uint32(82).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ApiForm {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseApiForm();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.slug = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.protectionType = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.protectionKey = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.notificationType = reader.int32() as any;
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.digestTime = reader.int32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.digestDayPart = reader.int32() as any;
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.domains.push(reader.string());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.notifications.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ApiForm {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      slug: isSet(object.slug) ? globalThis.String(object.slug) : "",
      protectionType: isSet(object.protectionType) ? protectionTypeFromJSON(object.protectionType) : 0,
      protectionKey: isSet(object.protectionKey) ? globalThis.String(object.protectionKey) : "",
      notificationType: isSet(object.notificationType) ? notificationTypeFromJSON(object.notificationType) : 0,
      digestTime: isSet(object.digestTime) ? globalThis.Number(object.digestTime) : 0,
      digestDayPart: isSet(object.digestDayPart) ? dayPartFromJSON(object.digestDayPart) : 0,
      domains: globalThis.Array.isArray(object?.domains) ? object.domains.map((e: any) => globalThis.String(e)) : [],
      notifications: globalThis.Array.isArray(object?.notifications)
        ? object.notifications.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: ApiForm): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.slug !== "") {
      obj.slug = message.slug;
    }
    if (message.protectionType !== 0) {
      obj.protectionType = protectionTypeToJSON(message.protectionType);
    }
    if (message.protectionKey !== "") {
      obj.protectionKey = message.protectionKey;
    }
    if (message.notificationType !== 0) {
      obj.notificationType = notificationTypeToJSON(message.notificationType);
    }
    if (message.digestTime !== 0) {
      obj.digestTime = Math.round(message.digestTime);
    }
    if (message.digestDayPart !== 0) {
      obj.digestDayPart = dayPartToJSON(message.digestDayPart);
    }
    if (message.domains?.length) {
      obj.domains = message.domains;
    }
    if (message.notifications?.length) {
      obj.notifications = message.notifications;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ApiForm>, I>>(base?: I): ApiForm {
    return ApiForm.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ApiForm>, I>>(object: I): ApiForm {
    const message = createBaseApiForm();
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.slug = object.slug ?? "";
    message.protectionType = object.protectionType ?? 0;
    message.protectionKey = object.protectionKey ?? "";
    message.notificationType = object.notificationType ?? 0;
    message.digestTime = object.digestTime ?? 0;
    message.digestDayPart = object.digestDayPart ?? 0;
    message.domains = object.domains?.map((e) => e) || [];
    message.notifications = object.notifications?.map((e) => e) || [];
    return message;
  },
};

function createBasePageableApiForm(): PageableApiForm {
  return { total: 0, results: [] };
}

export const PageableApiForm = {
  encode(message: PageableApiForm, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).int32(message.total);
    }
    for (const v of message.results) {
      ApiForm.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PageableApiForm {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePageableApiForm();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.total = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.results.push(ApiForm.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PageableApiForm {
    return {
      total: isSet(object.total) ? globalThis.Number(object.total) : 0,
      results: globalThis.Array.isArray(object?.results) ? object.results.map((e: any) => ApiForm.fromJSON(e)) : [],
    };
  },

  toJSON(message: PageableApiForm): unknown {
    const obj: any = {};
    if (message.total !== 0) {
      obj.total = Math.round(message.total);
    }
    if (message.results?.length) {
      obj.results = message.results.map((e) => ApiForm.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PageableApiForm>, I>>(base?: I): PageableApiForm {
    return PageableApiForm.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PageableApiForm>, I>>(object: I): PageableApiForm {
    const message = createBasePageableApiForm();
    message.total = object.total ?? 0;
    message.results = object.results?.map((e) => ApiForm.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
