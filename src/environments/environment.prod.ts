export const environment = {
    baseUrl: "http://localhost:8080",
    production: true,
    address: '0x22d80DB6115b73746d205b9D6688B56C78ea6204',
    "abi": [
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
