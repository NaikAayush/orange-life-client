import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-navbar',
  templateUrl: './public-navbar.component.html',
  styleUrls: ['./public-navbar.component.css'],
})
export class PublicNavbarComponent implements OnInit {
  menuState: boolean = false;

  constructor() {}

  ngOnInit(): void {}
  setMenuState() {
    if (this.menuState == true) {
      this.menuState = false;
    } else {
      this.menuState = true;
    }
  }
}
