import * as CryptoJS from 'crypto-js';

export class AesCrypto {
  private size: number = 128;
  private key: string | undefined;
  private iv: CryptoJS.lib.WordArray | undefined;

  constructor(key?: string, iv?: string) {
    this.key = key;
    this.iv = iv ? CryptoJS.enc.Utf8.parse(iv) : undefined;
  }
  
  generateUserKey(password: string, salt: string): string {
    const iterations = 10000; 

    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: this.size / 32,
      iterations: iterations,
    });

    const keyHex = key.toString(CryptoJS.enc.Hex);

    return keyHex
  }

  generateRandomIV(): string {
    const randomBytes = CryptoJS.lib.WordArray.random(this.size / 8);
    const iv = randomBytes.toString(CryptoJS.enc.Hex);
    return iv;
  }
  
  encrypt(plainText: string): string {
    const cipherText = CryptoJS.AES.encrypt(plainText, this.key, {
      iv: this.iv,
    }).toString();

    return cipherText;
  }

  decrypt(cipherText: string): string {
    const decryptedBytes = CryptoJS.AES.decrypt(cipherText, this.key, {
      iv: this.iv,
    });

    const plainText = decryptedBytes.toString(CryptoJS.enc.Utf8);

    return plainText;
  }

}
