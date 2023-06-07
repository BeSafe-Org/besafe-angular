export const environment = {
    baseUrl: "http://localhost:8080",
    production: true,
    address: '0x49103e1ebF765795d93e4aACc77Eb9dB7184e873',
    abi: [
      {
        "inputs": [] as any,
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "constant": true,
        "inputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "name": "files",
        "outputs": [
          {
            "internalType": "string",
            "name": "fileId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fileData",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "string",
            "name": "_fileId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_fileData",
            "type": "string"
          }
        ],
        "name": "addFile",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
};
