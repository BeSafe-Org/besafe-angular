// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    baseUrl: "http://localhost:8080",
    production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
