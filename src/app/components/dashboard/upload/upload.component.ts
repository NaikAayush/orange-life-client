import { Component, OnInit } from '@angular/core';
import { IpfsService } from 'src/app/services/ipfs/ipfs.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  constructor(private ipfs: IpfsService) {}

  ngOnInit(): void {}
  async handleFileInput(files: FileList) {
    const client = this.ipfs.connectToNetwork();
    console.log(await this.ipfs.uploadFile(client, files.item(0)));
  }
}
