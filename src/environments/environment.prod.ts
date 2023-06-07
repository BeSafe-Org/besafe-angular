export const environment = {
    baseUrl: "http://localhost:8080",
    production: true,
    address: '0xF8f10bf861d890408f35adA34e9aF208d1848901',
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
