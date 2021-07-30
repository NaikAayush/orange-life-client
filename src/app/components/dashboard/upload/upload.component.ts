import { Component, OnInit } from '@angular/core';
import { IpfsService } from 'src/app/services/ipfs/ipfs.service';
import { UmbralService } from 'src/app/services/umbral/umbral.service';
// import { toHexString } from 'src/app/services/umbral/utils';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  constructor(private ipfs: IpfsService, private umbral: UmbralService) {}

  ngOnInit(): void {}
  async handleFileInput(files: FileList) {
    const encryptedFile = await this.umbral.uploadFile(files.item(0));
    const client = this.ipfs.connectToNetwork();
    console.log(await this.ipfs.uploadFile(client, encryptedFile));

    // // keeping these for backup
    // let enc = new TextEncoder();
    // let dec = new TextDecoder("utf-8");

    // dec.decode(await files.item(0).arrayBuffer());
    // const decrypted = await this.umbral.decrypt("039dde8619b2844159c57b83434370c516a1e6fd5b2d04aec4270ac592683764c3", "039d278b1fccb6a6d602f073051a3f05b2218736f3229f4c71229850ed63c9de5e", new Uint8Array(await files.item(0).arrayBuffer()));
    // console.log(dec.decode(decrypted));

    // const encData = await this.umbral.uploadFile(files.item(0));

    // console.log(encData);

    // const decrypted = await this.umbral.decrypt(toHexString(encData.receivingPubKey.toBytes()), toHexString(encData.verifyKey.toBytes()), encData.ciphertext);

    // console.log(dec.decode(decrypted));

    // const client = this.ipfs.connectToNetwork();

    // console.log(await this.ipfs.uploadFile(client, files.item(0)));
  }
}
