
mkdir proto/src/gen
protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto \
 --ts_proto_out=./proto/src/gen \
 --ts_proto_opt=outputServices=grpc-js \
 --ts_proto_opt=esModuleInterop=true \
 -I=proto/ proto/src/proto/**/*.proto


# # mkdir koko
# protoc \
# --plugin=./node_modules/.bin/protoc-gen-ts_proto \
# --ts_proto_out=./proto/src/proto/**/*.proto ./proto/src \
# --ts_proto_opt=outputEncodeMethods=false,outputJsonMethods=false,outputClientImpl=false


# protoc --plugin=$(npm root)/.bin/protoc-gen-ts_proto \
#  --ts_proto_out=dist \
#  --ts_proto_opt=outputServices=grpc-js \
#  --ts_proto_opt=esModuleInterop=true \
#  -I=src/ src/**/*.proto
 
# protoc \
#   --plugin=./node_modules/ts-proto/protoc-gen-ts_proto \
#   --ts_proto_out=./ ./proto/src/proto/**/*.proto \
#   --ts_proto_opt=esModuleInterop=true,useExactTypes=false,initializeFieldsAsUndefined=false,exportCommonSymbols=false,unknownFields=true,usePrototypeForDefaults=true,outputExtensions=true \
  # ./proto/src/proto/**/*.proto 

# ./node_modules/.bin/tsc -p tsconfig.json


# Path to this plugin, Note this must be an abolsute path on Windows (see #15)
# PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

# Path to the grpc_node_plugin
# PROTOC_GEN_GRPC_PATH="./node_modules/.bin/grpc_tools_node_protoc_plugin"

# Directory to write generated code to (.js and .d.ts files)
# OUT_DIR="./proto/src/lib"

# protoc \
#     --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
#     --js_out="import_style=commonjs,binary:${OUT_DIR}" \
#     --ts_out="${OUT_DIR}" ./proto/src/proto/**/*.proto \

# protoc \
#     --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
#     --plugin=protoc-gen-grpc=${PROTOC_GEN_GRPC_PATH} \
#     --js_out="import_style=commonjs,binary:${OUT_DIR}" \
#     --ts_out="service=grpc-node:${OUT_DIR}" \
#     --grpc_out="${OUT_DIR}" ./proto/src/proto/**/*.proto \
#     # users.proto base.proto


# protoc \
#     --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
#     --js_out="import_style=commonjs,binary:${OUT_DIR}" \
#     --ts_out="${OUT_DIR}" ./proto/src/proto/**/*.proto\
    # users.proto base.proto