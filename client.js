const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync('chat.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const chatPackage = grpcObject.chat;
const client = new chatPackage.ChatService("localhost:40000", grpc.credentials.createInsecure());


const arg = process.argv[2];
if (arg === "send"){
    client.sendMessage({ message: process.argv[3]}, (err, response) => {
        err ? console.error(err) : console.log(response);
    });
} else if (arg === "get"){
    const call = client.getMessages({ connection_id: process.argv[3] });
    call.on('data', message => {
        console.log(message.message);
    });
 
}

// client.sendMessage({ message: process.argv[2], connection_id: process.argv[3]}, (err, response) => {
//     err ? console.error(err) : console.log(response);
// });

// const call = client.getMessages({ connection_id: process.argv[3] });
// call.on('data', message => {
//     console.log(message.message);
// });

// call.on('end', () => {
//     console.log("End of stream");
// });