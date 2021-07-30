import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Account as Web3Account } from 'web3-core';
import { Contract } from 'web3-eth-contract';
import { AuthService } from '../auth/auth.service';
import contractAbi from '../../../assets/contractAbi.json';

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  public initPromise: Promise<void>;

  private web3: Web3;
  private account: Web3Account;
  private contract: Contract;

  constructor(private auth: AuthService) {
    this.initPromise = this.init();
  }

  async init() {
    this.web3 = new Web3('http://localhost:8545');
    const data = await this.auth.getCredentials();
    const pk = data.pk;
    this.account = this.web3.eth.accounts.privateKeyToAccount(pk);
    console.log(this.account);

    this.contract = new this.web3.eth.Contract(
      contractAbi as any,
      '0x66d4d274faaaef7ee8536c6b4c1c306b3c5c7651',
      { from: this.account.address }
    );
  }

  async getRecords() {
    await this.initPromise;

    const res = await this.contract.methods
      .getMedicalRecords(this.account.address)
      .call();
    console.log(res);
  }

  async addRecord(
    cid: string,
    verifyKey: string,
    pubKey: string,
    nonce: number
  ) {
    await this.initPromise;

    console.log("adding record", cid, verifyKey, pubKey, nonce);

    const res = this.contract.methods.addMedicalRecord(
      cid,
      verifyKey,
      pubKey,
      nonce
    ).send({gasPrice: 1000, gas: 6721975});

    res
      .once('sending', function (payload) {
        console.log('Sending', payload);
      })
      .once('sent', function (payload) {
        console.log('Sent', payload);
      })
      .once('transactionHash', function (hash) {
        console.log('transactionHash', hash);
      })
      .once('receipt', function (receipt) {
        console.log('Receipt', receipt);
      })
      .on('confirmation', function (confNumber, receipt, latestBlockHash) {
        console.log('confirmed');
      })
      .on('error', function (error) {
        console.log('error', error);
      })
      .then(function (receipt) {
        // will be fired once the receipt is mined
      });
  }
}
