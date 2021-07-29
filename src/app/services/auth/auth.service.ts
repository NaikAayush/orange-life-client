import { Injectable } from '@angular/core';
import { Bip32, Bip39 } from '@ts-bitcoin/core';
// import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
// import * as bip32 from 'bip32';
// import { BIP32Interface } from 'bip32';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  createAccount(password: any) {
    const mnem = Bip39.fromRandom();
    var seed = new Bip39(mnem.mnemonic).toSeed(password);
    var x = Bip32.fromSeed(seed);
    console.log(mnem.mnemonic);
    console.log(x.privKey.toString());
  }

  retrieveAccount(mnem: any, password: any) {
    var seed = new Bip39(mnem).toSeed(password);
    console.log(seed);
    var x = Bip32.fromSeed(seed);
    console.log(x.privKey.toString());
  }
}
