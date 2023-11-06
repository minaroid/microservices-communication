/* eslint-disable */
import { ChannelCredentials, Client, makeGenericClientConstructor, Metadata } from "@grpc/grpc-js";
import type {
  CallOptions,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "v1.auth";

export interface VerificationRequest {
  token: string;
}

export interface Profile {
  userName: string;
}

export interface VerificationResponse {
  /** 200 || 401 */
  status: number;
  profile: Profile | undefined;
}

function createBaseVerificationRequest(): VerificationRequest {
  return { token: "" };
}

export const VerificationRequest = {
  encode(message: VerificationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerificationRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerificationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.token = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerificationRequest {
    return { token: isSet(object.token) ? globalThis.String(object.token) : "" };
  },

  toJSON(message: VerificationRequest): unknown {
    const obj: any = {};
    if (message.token !== "") {
      obj.token = message.token;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerificationRequest>, I>>(base?: I): VerificationRequest {
    return VerificationRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerificationRequest>, I>>(object: I): VerificationRequest {
    const message = createBaseVerificationRequest();
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseProfile(): Profile {
  return { userName: "" };
}

export const Profile = {
  encode(message: Profile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userName !== "") {
      writer.uint32(10).string(message.userName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Profile {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProfile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.userName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Profile {
    return { userName: isSet(object.userName) ? globalThis.String(object.userName) : "" };
  },

  toJSON(message: Profile): unknown {
    const obj: any = {};
    if (message.userName !== "") {
      obj.userName = message.userName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Profile>, I>>(base?: I): Profile {
    return Profile.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Profile>, I>>(object: I): Profile {
    const message = createBaseProfile();
    message.userName = object.userName ?? "";
    return message;
  },
};

function createBaseVerificationResponse(): VerificationResponse {
  return { status: 0, profile: undefined };
}

export const VerificationResponse = {
  encode(message: VerificationResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.profile !== undefined) {
      Profile.encode(message.profile, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerificationResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerificationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.status = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.profile = Profile.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerificationResponse {
    return {
      status: isSet(object.status) ? globalThis.Number(object.status) : 0,
      profile: isSet(object.profile) ? Profile.fromJSON(object.profile) : undefined,
    };
  },

  toJSON(message: VerificationResponse): unknown {
    const obj: any = {};
    if (message.status !== 0) {
      obj.status = Math.round(message.status);
    }
    if (message.profile !== undefined) {
      obj.profile = Profile.toJSON(message.profile);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerificationResponse>, I>>(base?: I): VerificationResponse {
    return VerificationResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerificationResponse>, I>>(object: I): VerificationResponse {
    const message = createBaseVerificationResponse();
    message.status = object.status ?? 0;
    message.profile = (object.profile !== undefined && object.profile !== null)
      ? Profile.fromPartial(object.profile)
      : undefined;
    return message;
  },
};

export type AuthServiceService = typeof AuthServiceService;
export const AuthServiceService = {
  /** unary API */
  verify: {
    path: "/v1.auth.AuthService/Verify",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: VerificationRequest) => Buffer.from(VerificationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => VerificationRequest.decode(value),
    responseSerialize: (value: VerificationResponse) => Buffer.from(VerificationResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => VerificationResponse.decode(value),
  },
} as const;

export interface AuthServiceServer extends UntypedServiceImplementation {
  /** unary API */
  verify: handleUnaryCall<VerificationRequest, VerificationResponse>;
}

export interface AuthServiceClient extends Client {
  /** unary API */
  verify(
    request: VerificationRequest,
    callback: (error: ServiceError | null, response: VerificationResponse) => void,
  ): ClientUnaryCall;
  verify(
    request: VerificationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: VerificationResponse) => void,
  ): ClientUnaryCall;
  verify(
    request: VerificationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: VerificationResponse) => void,
  ): ClientUnaryCall;
}

export const AuthServiceClient = makeGenericClientConstructor(AuthServiceService, "v1.auth.AuthService") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): AuthServiceClient;
  service: typeof AuthServiceService;
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
