export class BesafeCrypto {
    constructor() { }

    encryptArrayBuffer(inputArrayBuffer: ArrayBuffer): Uint8Array {
        const encryptionKey = 42;
        const encryptedArray = new Uint8Array(inputArrayBuffer.byteLength);
        const inputArray = new Uint8Array(inputArrayBuffer);
        for (let i = 0; i < inputArray.length; i++) {
            encryptedArray[i] = inputArray[i] ^ encryptionKey;
        }
        return encryptedArray;
    }

    decryptArrayBuffer(arrayBuffer: ArrayBuffer): Uint8Array {
        const decryptionKey = 42;
        const decryptedArray = new Uint8Array(arrayBuffer.byteLength);
        const inputArray = new Uint8Array(arrayBuffer);
        for (let i = 0; i < inputArray.length; i++) {
            decryptedArray[i] = inputArray[i] ^ decryptionKey;
        }
        return decryptedArray;
    }
}