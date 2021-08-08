import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DownloadService } from 'src/app/services/download/download.service';
import { IpfsService } from 'src/app/services/ipfs/ipfs.service';
import { TheGraphService } from 'src/app/services/the-graph/the-graph.service';
import { UmbralService } from 'src/app/services/umbral/umbral.service';
import { Web3Service } from 'src/app/services/web3/web3.service';

@Component({
  selector: 'app-record-render',
  templateUrl: './record-render.component.html',
  styleUrls: ['./record-render.component.css'],
})
export class RecordRenderComponent implements OnInit {
  id: string;
  pk: string;
  vk: string;
  docName: string;
  docMimeType: string;
  blob_url;
  imageLoading: boolean = false;
  scan: boolean = false;
  input: boolean = false;
  publicKey: string;
  nonce: number;
  idx: number;
  address: string;

  constructor(
    private route: ActivatedRoute,
    private thegraph: TheGraphService,
    private ipfs: IpfsService,
    private umbral: UmbralService,
    private download: DownloadService,
    private web3: Web3Service
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.pk = this.route.snapshot.params.pk;
    this.vk = this.route.snapshot.params.vk;
    this.nonce = parseInt(this.route.snapshot.params.nonce);
    this.idx = parseInt(this.route.snapshot.params.idx);
    this.docName = this.route.snapshot.params.docName;
    this.docMimeType =
      this.route.snapshot.params.docMimeType +
      '/' +
      this.route.snapshot.params.docMimeType1;

    const fileBlob = await this.ipfs.downloadFile(this.id);
    const uArray = new Uint8Array(await fileBlob.arrayBuffer());
    const decryptData = await this.umbral.decrypt(this.pk, this.vk, uArray);
    const blob = new Blob([decryptData]);
    this.blob_url = URL.createObjectURL(blob);
    this.imageLoading = true;
  }

  async downloadFile() {
    const fileBlob = await this.ipfs.downloadFile(this.id);
    const uArray = new Uint8Array(await fileBlob.arrayBuffer());
    const decryptData = await this.umbral.decrypt(this.pk, this.vk, uArray);
    this.download.downloadBlob(decryptData, this.docName, this.docMimeType);
  }

  startScan() {
    this.scan = true;
  }

  scanSuccessHandler($event) {
    console.log($event);
    const data: string = $event;
    this.publicKey = data.split('.')[0];
    this.address = data.split('.')[1];
    this.scan = false;
    this.input = true;
  }

  async grantAccess() {
    console.log('DATAAA', this.nonce, this.idx, this.publicKey, this.address);
    await this.umbral.grantAccess(this.publicKey, this.nonce);
    await this.web3.grantAccess(this.address, this.idx);
  }
}
