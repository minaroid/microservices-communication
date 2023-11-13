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

export const protobufPackage = "v1.product";

export interface GetProductByIdRequest {
  id: number;
}

export interface Product {
  id: number;
  quantity: number;
  price: number;
  name: string;
}

export interface GetProductByIdResponse {
  /** 200 || 404 */
  status: number;
  product: Product | undefined;
}

function createBaseGetProductByIdRequest(): GetProductByIdRequest {
  return { id: 0 };
}

export const GetProductByIdRequest = {
  encode(message: GetProductByIdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProductByIdRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetProductByIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetProductByIdRequest {
    return { id: isSet(object.id) ? globalThis.Number(object.id) : 0 };
  },

  toJSON(message: GetProductByIdRequest): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetProductByIdRequest>, I>>(base?: I): GetProductByIdRequest {
    return GetProductByIdRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetProductByIdRequest>, I>>(object: I): GetProductByIdRequest {
    const message = createBaseGetProductByIdRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseProduct(): Product {
  return { id: 0, quantity: 0, price: 0, name: "" };
}

export const Product = {
  encode(message: Product, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.quantity !== 0) {
      writer.uint32(16).int32(message.quantity);
    }
    if (message.price !== 0) {
      writer.uint32(24).int32(message.price);
    }
    if (message.name !== "") {
      writer.uint32(34).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Product {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProduct();
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
          if (tag !== 16) {
            break;
          }

          message.quantity = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.price = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Product {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      quantity: isSet(object.quantity) ? globalThis.Number(object.quantity) : 0,
      price: isSet(object.price) ? globalThis.Number(object.price) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
    };
  },

  toJSON(message: Product): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.quantity !== 0) {
      obj.quantity = Math.round(message.quantity);
    }
    if (message.price !== 0) {
      obj.price = Math.round(message.price);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Product>, I>>(base?: I): Product {
    return Product.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Product>, I>>(object: I): Product {
    const message = createBaseProduct();
    message.id = object.id ?? 0;
    message.quantity = object.quantity ?? 0;
    message.price = object.price ?? 0;
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseGetProductByIdResponse(): GetProductByIdResponse {
  return { status: 0, product: undefined };
}

export const GetProductByIdResponse = {
  encode(message: GetProductByIdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.product !== undefined) {
      Product.encode(message.product, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProductByIdResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetProductByIdResponse();
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

          message.product = Product.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetProductByIdResponse {
    return {
      status: isSet(object.status) ? globalThis.Number(object.status) : 0,
      product: isSet(object.product) ? Product.fromJSON(object.product) : undefined,
    };
  },

  toJSON(message: GetProductByIdResponse): unknown {
    const obj: any = {};
    if (message.status !== 0) {
      obj.status = Math.round(message.status);
    }
    if (message.product !== undefined) {
      obj.product = Product.toJSON(message.product);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetProductByIdResponse>, I>>(base?: I): GetProductByIdResponse {
    return GetProductByIdResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetProductByIdResponse>, I>>(object: I): GetProductByIdResponse {
    const message = createBaseGetProductByIdResponse();
    message.status = object.status ?? 0;
    message.product = (object.product !== undefined && object.product !== null)
      ? Product.fromPartial(object.product)
      : undefined;
    return message;
  },
};

export type ProductServiceService = typeof ProductServiceService;
export const ProductServiceService = {
  /** unary API */
  getProductById: {
    path: "/v1.product.ProductService/GetProductById",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetProductByIdRequest) => Buffer.from(GetProductByIdRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetProductByIdRequest.decode(value),
    responseSerialize: (value: GetProductByIdResponse) => Buffer.from(GetProductByIdResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetProductByIdResponse.decode(value),
  },
} as const;

export interface ProductServiceServer extends UntypedServiceImplementation {
  /** unary API */
  getProductById: handleUnaryCall<GetProductByIdRequest, GetProductByIdResponse>;
}

export interface ProductServiceClient extends Client {
  /** unary API */
  getProductById(
    request: GetProductByIdRequest,
    callback: (error: ServiceError | null, response: GetProductByIdResponse) => void,
  ): ClientUnaryCall;
  getProductById(
    request: GetProductByIdRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetProductByIdResponse) => void,
  ): ClientUnaryCall;
  getProductById(
    request: GetProductByIdRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetProductByIdResponse) => void,
  ): ClientUnaryCall;
}

export const ProductServiceClient = makeGenericClientConstructor(
  ProductServiceService,
  "v1.product.ProductService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): ProductServiceClient;
  service: typeof ProductServiceService;
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
