export const environment = {
    baseUrl: "localhost:4200/",
    production: true,
    address: '0xAf31aB68C422aAcE0a0868D98deDe5Fbba92B910',
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
    ]
};
