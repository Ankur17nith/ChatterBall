const crypto = require('crypto')

function generateKeyPair(){
    const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa',{
                    modulusLength: 2048,
                    publicKeyEncoding:{type:'spki', format: 'pem'},
                    privateKeyEncoding: {type: 'pkcs8', format: 'pem'}
                }
            )

    return {
        privateKey,
        publicKey
    }
}

async function encryptMessage(message, publicKey){
    const encryptedBuffer = await crypto.publicEncrypt(
        publicKey,
        Buffer.from(message,'utf8')
    )
    return encryptedBuffer.toString("base64");
}


async function decryptMessage(encryptedMessage, privateKey){
    const decryptedMessage= await crypto.privateEncrypt(
        privateKey,
        Buffer.from(encryptMessage,"base64")
    );

    return decryptedMessage.toString("utf8");
}

module.exports={
    generateKeyPair,
    encryptMessage,
    decryptMessage
}

