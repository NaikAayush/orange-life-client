import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UmbralService } from 'src/app/services/umbral/umbral.service';

@Component({
  selector: 'app-display-qr',
  templateUrl: './display-qr.component.html',
  styleUrls: ['./display-qr.component.css'],
})
export class DisplayQrComponent implements OnInit {
  data: string;
  umbralPublicKey: string;
  constructor(private auth: AuthService, private umbral: UmbralService) {}

  async ngOnInit() {
    this.umbralPublicKey = await this.umbral.getPublicKeyHex();

    const data = await this.auth.getCredentials();
    const address = data.address;
    this.data = this.umbralPublicKey + '.' + address;
    console.log('QRdata', this.data);
  }
}
