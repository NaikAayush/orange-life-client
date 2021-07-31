import { Injectable } from '@angular/core';
import * as bip32 from 'bip32';
import * as Bip39 from 'bip39';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private generateMnemonic() {
    return Bip39.generateMnemonic();
  }

  private generateSeed(mnemonic: string, password: string) {
    return Bip39.mnemonicToSeedSync(mnemonic, password);
  }

  private generateBIP32(seed: Buffer) {
    return bip32.fromSeed(seed);
  }

  public createAccount(password: string) {
    const mnem = this.generateMnemonic();
    const seed = this.generateSeed(mnem, password);
    const root = this.generateBIP32(seed);
    // console.log({ mnemonic: mnem, pk: root.privateKey?.toString('hex') });
    return { mnemonic: mnem, pk: root.privateKey?.toString('hex') };
  }

  public retrieveAccount(mnem: any, password: any) {
    const seed = this.generateSeed(mnem, password);
    const root = this.generateBIP32(seed);
    // console.log({ pk: root.privateKey?.toString('hex') });
    return { pk: root.privateKey?.toString('hex') };
  }
}
