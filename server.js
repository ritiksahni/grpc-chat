const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync('chat.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDef);

const chatPackage = grpcObject.chat;

const server = new grpc.Server();
server.bindAsync("localhost:40000", grpc.ServerCredentials.createInsecure(), () => {
    console.log("Server running")
});
server.addService(chatPackage.ChatService.service, {
    "SendMessage": sendMessage,
    "GetMessages": getMessages,
    // "GetConnections": getConnections,
    // "AddConnection": addConnection,
    // "RemoveConnection": removeConnection
})

const messages = [];

function sendMessage(call, callback) {
    const message = call.request.message;
    messages.push(message);
    callback(null, {});
}

function getMessages(call) {
    messages.forEach(message => {
        call.write({ message: message });
    });
    call.wait()
}

// function addConnection(id) {
//     connection_pool.push({ id: id, messages: [] });
// }

// function removeConnection(call, callback) {
//     console.log("Connection removed: ", call.request.name);
//     callback(null, {});
// }
