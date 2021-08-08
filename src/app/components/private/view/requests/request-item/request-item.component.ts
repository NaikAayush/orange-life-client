import { Component, OnInit, Input } from '@angular/core';
import { UmbralService } from 'src/app/services/umbral/umbral.service';
import { Web3Service } from 'src/app/services/web3/web3.service';

@Component({
  selector: 'app-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.css'],
})
export class RequestItemComponent implements OnInit {
  @Input() fileName: string;
  @Input() nonce: number;
  @Input() idx: number;
  @Input() address: [];
  publicKey = '';
  constructor(private umbral: UmbralService, private web3: Web3Service) {}

  ngOnInit(): void {}

  async grantAccess(address) {
    console.log('DATAAA', this.nonce, this.idx, this.publicKey, address);
    const publicKey = await this.umbral.getPublicKeyFromAddress(address);
    await this.umbral.grantAccess(publicKey, parseInt(this.nonce as any));
    await this.web3.grantAccess(address, parseInt(this.idx as any));
  }
}
