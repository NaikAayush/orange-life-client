import { Injectable } from '@angular/core';
import * as bip32 from 'bip32';
import * as Bip39 from 'bip39';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private dbService: NgxIndexedDBService) {}

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
    console.log(root);
    console.log(
      { mnemonic: mnem, pk: root.privateKey?.toString('hex') },
      root.chainCode
    );
    this.login(root.privateKey?.toString('hex'), root.chainCode);
    return { mnemonic: mnem };
  }

  public retrieveAccount(mnem: any, password: any) {
    const seed = this.generateSeed(mnem, password);
    const root = this.generateBIP32(seed);
    // console.log({ pk: root.privateKey?.toString('hex') });
    this.login(root.privateKey?.toString('hex'), root.chainCode);
    // return { pk: root.privateKey?.toString('hex') };
  }

  private deriveRoot(index: number) {
    const pk = this.getCredentials();
    // const x = bip32.fromPrivateKey(pk)
  }

  private hashPrivateKey(pk: string) {
    return btoa(pk);
  }

  private login(pk: string, chainCode: Buffer) {
    const hash = this.hashPrivateKey(pk);
    this.dbService
      .add('auth', {
        privateKey: hash,
        chainCode: chainCode,
      })
      .subscribe((item) => {
        console.log('item: ', item);
      });
    localStorage.setItem('pk-hash', hash);
    localStorage.setItem('chain-code', chainCode.toString());
  }

  public logout() {
    localStorage.removeItem('pk-hash');
  }

  public async getCredentials() {
    console.log(atob(localStorage.getItem('pk-hash')));
    console.log(Buffer.from(localStorage.getItem('chain-code')));
    return atob(localStorage.getItem('pk-hash'));
  }
}
