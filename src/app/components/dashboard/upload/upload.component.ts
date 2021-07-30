import { Component, OnInit } from '@angular/core';
import { IpfsService } from 'src/app/services/ipfs/ipfs.service';
import { UmbralService } from 'src/app/services/umbral/umbral.service';
import { Web3Service } from 'src/app/services/web3/web3.service';
import { toHexString } from 'src/app/services/umbral/utils';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  constructor(
    private ipfs: IpfsService,
    private umbral: UmbralService,
    private web3: Web3Service
  ) {}

  ngOnInit(): void {}
  async handleFileInput(files: FileList) {
    const encryptedData = await this.umbral.uploadFile(files.item(0));
    const encryptedFile = this.umbral.getDataAsFile(
      files.item(0).name,
      encryptedData
    );
    const client = this.ipfs.connectToNetwork();
    const uploadedFile = await this.ipfs.uploadFile(client, encryptedFile);

    console.log('Uploaded file CID is', uploadedFile.cid.toString());

    await this.web3.initPromise;

    console.log('hmm');
    await this.web3.getRecords();
    await this.web3.addRecord(
      uploadedFile.cid.toString(),
      toHexString(encryptedData.verifyKey.toBytes()),
      toHexString(encryptedData.delegatingPubKey.toBytes()),
      encryptedData.nonce
    );
    await this.web3.getRecords();

    // keeping these for backup
    // >>>>>> decode start
    // let enc = new TextEncoder();
    // let dec = new TextDecoder("utf-8");

    // dec.decode(await files.item(0).arrayBuffer());
    // const decrypted = await this.umbral.decrypt("039dde8619b2844159c57b83434370c516a1e6fd5b2d04aec4270ac592683764c3", "02313887808989ae8f43ac63273e1297bddff15c2724b236e8cbfb0ff857aad92f", new Uint8Array(await files.item(0).arrayBuffer()));
    // console.log(dec.decode(decrypted));
    // >>>>>> decode end

    // const encData = await this.umbral.uploadFile(files.item(0));

    // console.log(encData);

    // const decrypted = await this.umbral.decrypt(toHexString(encData.receivingPubKey.toBytes()), toHexString(encData.verifyKey.toBytes()), encData.ciphertext);

    // console.log(dec.decode(decrypted));

    // const client = this.ipfs.connectToNetwork();

    // console.log(await this.ipfs.uploadFile(client, files.item(0)));
  }
}
