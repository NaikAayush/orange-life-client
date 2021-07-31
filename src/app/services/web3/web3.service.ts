import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  constructor(private auth: AuthService) {
    this.init();
  }

  async init() {
    var web3 = new Web3('http://localhost:8545');
    const data = await this.auth.getCredentials();
    const pk = data.pk;
    const account = web3.eth.accounts.privateKeyToAccount(pk);
    console.log(account);
  }
}
