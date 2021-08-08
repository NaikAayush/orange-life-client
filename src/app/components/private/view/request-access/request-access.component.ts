import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Web3Service } from 'src/app/services/web3/web3.service';

@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html',
  styleUrls: ['./request-access.component.css'],
})
export class RequestAccessComponent implements OnInit {
  scan: boolean = false;
  address: string;
  constructor(private web3: Web3Service, private router: Router) {}

  ngOnInit(): void {}

  startScan() {
    this.scan = true;
  }

  scanSuccessHandler($event) {
    this.address = $event.split('.')[1].toLowerCase();
    this.scan = false;
    // this.web3.requestAccess(this.address)
  }

  search() {
    this.router.navigateByUrl('records/user/' + this.address);
  }
}
