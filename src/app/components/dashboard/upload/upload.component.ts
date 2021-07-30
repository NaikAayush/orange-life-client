import { Component, OnInit } from '@angular/core';
import { IpfsService } from 'src/app/services/ipfs/ipfs.service';
import { UmbralService } from 'src/app/services/umbral/umbral.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  constructor(private ipfs: IpfsService, private umbral: UmbralService) {}

  ngOnInit(): void {}
  async handleFileInput(files: FileList) {
    const encData = this.umbral.uploadFile(files.item(0));

    console.log(encData);

    // const client = this.ipfs.connectToNetwork();

    // console.log(await this.ipfs.uploadFile(client, files.item(0)));
  }
}
