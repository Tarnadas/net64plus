PACKAGE = net64-proto

PROTO_DIRS = . server-client shared client-server
PROTO_FILES = $(foreach sdir,$(PROTO_DIRS),$(wildcard $(sdir)/*.proto))
SRC_OUT = ../src/protobuf

cpp:
	protoc --cpp_out=$(SRC_OUT) $(PROTO_FILES)

csharp:
	protoc --csharp_out=$(SRC_OUT) $(PROTO_FILES)

clean:
	rm -r $(SRC_OUT)
	mkdir $(SRC_OUT)
