import { Component, OnInit } from '@angular/core';
import { IpfsService } from 'src/app/services/ipfs/ipfs.service';
import { TheGraphService } from 'src/app/services/the-graph/the-graph.service';
import { UmbralService } from 'src/app/services/umbral/umbral.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
})
export class DownloadComponent implements OnInit {
  constructor(
    private thegraph: TheGraphService,
    private ipfs: IpfsService,
    private umbral: UmbralService
  ) {}

  async ngOnInit() {
    const receiving_pk =
      '033f18c2090741f69025c850143934e0d8126cc1d01d570fdf8d52f79996d08024';
    const verifying_key =
      '023c5046a71ebde4021ae90e56f14c3aee1b2f26824cb291c6b57cd5ba064f70c2';
    const docid = 'QmNtokC8NXQoRhgoxmMUUuBRWx6SE4t4k6CNmXsx4C2iD4';

    // const data = await this.thegraph.exampleQuery();
    // const ipfsID = data[0].docCID;
    // console.log(data.data.medicalRecords[0].docCID);

    const fileBlob = await this.ipfs.downloadFile(docid);
    const uArray = new Uint8Array(await fileBlob.arrayBuffer());
    const decryptData = await this.umbral.decrypt(
      receiving_pk,
      verifying_key,
      uArray
    );
    this.downloadBlob(decryptData, 'aa.png', 'image/png');
  }

  downloadBlob(data, fileName, mimeType) {
    var blob, url;
    blob = new Blob([data], {
      type: mimeType,
    });
    url = window.URL.createObjectURL(blob);
    this.downloadURL(url, fileName);
    setTimeout(function () {
      return window.URL.revokeObjectURL(url);
    }, 1000);
  }

  downloadURL(data, fileName) {
    var a;
    a = document.createElement('a');
    a.href = data;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  }
}
