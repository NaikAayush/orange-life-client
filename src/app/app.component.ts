import { Component } from '@angular/core';
import { Web3Service } from './services/web3/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';
  mode: string;
  backdrop: string;
  menuState: boolean = false;
  menuItems = ['Dashboard', 'Medical Records', 'Requests', 'Trusted Contacts'];
  mobile;
  events: string[] = [];
  opened: boolean;

  constructor(private web3: Web3Service) {
    console.log(navigator.userAgent);
    var ua = navigator.userAgent;

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        ua
      )
    ) {
      console.log('mobile');
      this.mobile = true;
      this.mode = 'over';
      this.backdrop = 'true';
      this.opened = false;
    } else {
      console.log('desktop');
      this.mobile = false;
      this.mode = 'side';
      this.backdrop = 'false';
      this.opened = true;
    }
  }

  setMenuState() {
    if (this.menuState == true) {
      this.menuState = false;
    } else {
      this.menuState = true;
    }
  }
}
