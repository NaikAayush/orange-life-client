import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UmbralService } from 'src/app/services/umbral/umbral.service';

@Component({
  selector: 'app-display-qr',
  templateUrl: './display-qr.component.html',
  styleUrls: ['./display-qr.component.css'],
})
export class DisplayQrComponent implements OnInit {
  constructor(private auth: AuthService, private umbral: UmbralService) {}

  ngOnInit(): void {
    console.log(this.umbral.key.getPubKeyHex());
  }
}
