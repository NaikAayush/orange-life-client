export class EncryptedDataHex {
  constructor(
    public capsule: string,
    public ciphertext: string,
    public signingKey: string,
    public verifyKey: string,
    public nonce: number,
    public kfrags: string[]
  ) {}
}
