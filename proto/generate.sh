#!/bin/bash

protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=../frontend/src enum.proto
protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=../frontend/src dto.proto

protoc -I=. --python_betterproto_out=../formbox enum.proto
protoc -I=. --python_betterproto_out=../formbox dto.proto