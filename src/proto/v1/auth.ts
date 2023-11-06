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

export interface TokenRequest {
  token: string;
}

export interface ProfileResponse {
  /** 200 || 401 */
  status: number;
  userName: string;
}

function createBaseTokenRequest(): TokenRequest {
  return { token: "" };
}

export const TokenRequest = {
  encode(message: TokenRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TokenRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenRequest();
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

  fromJSON(object: any): TokenRequest {
    return { token: isSet(object.token) ? globalThis.String(object.token) : "" };
  },

  toJSON(message: TokenRequest): unknown {
    const obj: any = {};
    if (message.token !== "") {
      obj.token = message.token;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TokenRequest>, I>>(base?: I): TokenRequest {
    return TokenRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TokenRequest>, I>>(object: I): TokenRequest {
    const message = createBaseTokenRequest();
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseProfileResponse(): ProfileResponse {
  return { status: 0, userName: "" };
}

export const ProfileResponse = {
  encode(message: ProfileResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.userName !== "") {
      writer.uint32(18).string(message.userName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProfileResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProfileResponse();
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

  fromJSON(object: any): ProfileResponse {
    return {
      status: isSet(object.status) ? globalThis.Number(object.status) : 0,
      userName: isSet(object.userName) ? globalThis.String(object.userName) : "",
    };
  },

  toJSON(message: ProfileResponse): unknown {
    const obj: any = {};
    if (message.status !== 0) {
      obj.status = Math.round(message.status);
    }
    if (message.userName !== "") {
      obj.userName = message.userName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProfileResponse>, I>>(base?: I): ProfileResponse {
    return ProfileResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProfileResponse>, I>>(object: I): ProfileResponse {
    const message = createBaseProfileResponse();
    message.status = object.status ?? 0;
    message.userName = object.userName ?? "";
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
    requestSerialize: (value: TokenRequest) => Buffer.from(TokenRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => TokenRequest.decode(value),
    responseSerialize: (value: ProfileResponse) => Buffer.from(ProfileResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ProfileResponse.decode(value),
  },
} as const;

export interface AuthServiceServer extends UntypedServiceImplementation {
  /** unary API */
  verify: handleUnaryCall<TokenRequest, ProfileResponse>;
}

export interface AuthServiceClient extends Client {
  /** unary API */
  verify(
    request: TokenRequest,
    callback: (error: ServiceError | null, response: ProfileResponse) => void,
  ): ClientUnaryCall;
  verify(
    request: TokenRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ProfileResponse) => void,
  ): ClientUnaryCall;
  verify(
    request: TokenRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ProfileResponse) => void,
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
