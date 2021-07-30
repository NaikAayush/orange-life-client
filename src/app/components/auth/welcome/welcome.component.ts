import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Web3Service } from 'src/app/services/web3/web3.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  constructor(private router: Router, private web3: Web3Service) {}

  ngOnInit(): void {}

  handleClick(type: String) {
    this.router.navigateByUrl('auth/' + type);
  }
}
