import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Account as Web3Account } from 'web3-core';
import { Contract } from 'web3-eth-contract';
import { AuthService } from '../auth/auth.service';
import contractAbi from '../../../assets/contractAbi.json';
import { environment } from 'src/environments/environment';
import { RelayProvider } from '@opengsn/provider';

const DEFAULT_GAS = 2000000;

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
    this.web3 = new Web3(environment.INFURA_URL);
    this.web3.eth.transactionPollingTimeout = 5000;
    this.web3.eth.transactionConfirmationBlocks = 2;

    const configuration = {
      relayHubAddress: '0x6646cD15d33cE3a6933e36de38990121e8ba2806',
      // OrangePayMaster
      paymasterAddress: '0x2dA3AB663a01dBd1dDB53F16B0BB925C815B1361',
      // their accept-all paymaster
      // paymasterAddress: '0xcA94aBEdcC18A10521aB7273B3F3D5ED28Cf7B8A',
      // forwarderAddress: '0x4d4581c01A457925410cd3877d17b2fd4553b2C5',
      // ourContract: '0xAd7879348C00AD6E5c88E418b7E66A0D386Ee733',
      loggerConfiguration: {
        logLevel: 'debug' as any,
      },
      // preferredRelays: ['0x1d89e298a3aB270F4E0644D6dA46C6E001b34e3A'],
      relayRegistrationLookupBlocks: 60000,
      sliceSize: 1,
    };

    const provider = await RelayProvider.newProvider({
      provider: this.web3.currentProvider as any,
      config: configuration,
    }).init();
    // const provider = new RelayProvider(
    //   this.web3.currentProvider as any,
    //   configuration
    // );
    this.web3 = new Web3(provider);

    const data = await this.auth.getCredentials();
    const pk = data.pk;
    this.account = this.web3.eth.accounts.privateKeyToAccount(pk);
    this.auth.storeAddress(this.account.address);
    provider.addAccount(this.account.privateKey);
    console.log(this.account);

    this.contract = new this.web3.eth.Contract(
      contractAbi as any,
      '0x9cc6c1FB0ee80a2389a286da0BB7903dE0175172',
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
    name: string,
    mimeType: string,
    cid: string,
    verifyKey: string,
    pubKey: string,
    nonce: number,
    extraData: string = ''
  ) {
    await this.initPromise;

    console.log(
      'adding record',
      name,
      mimeType,
      cid,
      verifyKey,
      pubKey,
      nonce,
      extraData,
      this.account.address
    );

    const res = await this.contract.methods
      .addMedicalRecord(cid, verifyKey, pubKey, name, mimeType, extraData, nonce)
      .send({ from: this.account.address,  gas: DEFAULT_GAS });

    console.log("transaction done!!", res);
  }

  async requestAccess(
    ownerAddress: string,
    index: number
  ) {
    await this.initPromise;

    console.log("Requesting access", ownerAddress, index);

    const res = this.contract.methods
      .requestAccess(ownerAddress, index)
      .send({ from: this.account.address,  gas: DEFAULT_GAS });

    console.log("transaction done!!", res);
  }

  async grantAccess(
    addressToGiveAccess: string,
    index: number
  ) {
    await this.initPromise;

    console.log("Granting access!!", addressToGiveAccess, index);

    const res = this.contract.methods
      .grantAccess(addressToGiveAccess, index)
      .send({ from: this.account.address,  gas: DEFAULT_GAS });

    console.log("transaction done!!", res);
  }

  async revokeAccess(
    addressToRevokeAccess: string,
    index: number
  ) {
    await this.initPromise;

    console.log("Revoke access!!", addressToRevokeAccess, index);

    const res = this.contract.methods
      .grantAccess(addressToRevokeAccess, index)
      .send({ from: this.account.address,  gas: DEFAULT_GAS });

    console.log("transaction done!!", res);
  }
}
