import { Injectable } from '@angular/core';
import * as bip32 from 'bip32';
import * as Bip39 from 'bip39';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { keyfrag_equals } from 'src/assets/umbral/pkg/pkg-bundler/umbral_pre_wasm_bg.wasm';

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
    const data: any = this.getCredentials();
    const root = bip32.fromPrivateKey(data.pk, data.chainCode);
    const newRoot = root.derive(index);
    return newRoot.privateKey.toString('hex');
  }

  private hashPrivateKey(pk: string) {
    return btoa(pk);
  }

  private login(pk: string, chainCode: Buffer) {
    const hash = this.hashPrivateKey(pk);
    this.dbService.update('auth', {
      id: 1,
      privateKey: hash,
      chainCode: chainCode,
    });
  }

  public logout() {
    localStorage.removeItem('pk-hash');
  }

  public async getCredentials() {
    const data: any = await this.dbService.getByKey('auth', 1).toPromise();
    const pk = atob(data.privateKey);
    const chainCode = data.chainCode;
    console.log(pk, chainCode);
    return { pk: pk, chainCode: chainCode };
  }
}
