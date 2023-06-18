import * as CryptoJS from 'crypto-js';
import { SHA256 } from 'crypto-js';

export class AesCrypto {
  private size: number = 128;
  private key: string | undefined;
  private iv: CryptoJS.lib.WordArray | undefined;

  constructor(key?: string, iv?: string) {
    this.key = key;
    this.iv = iv ? CryptoJS.enc.Utf8.parse(iv) : undefined;
  }

  sha256(input: string): string {
    const hash = SHA256(input);
    return hash.toString();
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

  async encryptAES(data: ArrayBuffer, password: string): Promise<Uint8Array> {
    const passwordBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
    const key = await crypto.subtle.importKey('raw', passwordBuffer, 'AES-CBC', false, ['encrypt']);
    const iv = crypto.getRandomValues(new Uint8Array(16));

    const encryptedData = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, key, data);
    const encryptedContent = new Uint8Array([...iv, ...new Uint8Array(encryptedData)]);

    return encryptedContent;
  }

  async decryptAES(data: ArrayBuffer, password: string): Promise<Uint8Array> {
    const passwordBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
    const key = await crypto.subtle.importKey('raw', passwordBuffer, 'AES-CBC', false, ['decrypt']);

    const iv = data.slice(0, 16);
    const encryptedData = data.slice(16);

    const decryptedData = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, encryptedData);
    const decryptedContent = new Uint8Array(decryptedData);

    return decryptedContent;
  }

}
