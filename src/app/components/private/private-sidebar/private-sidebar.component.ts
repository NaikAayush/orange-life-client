import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-sidebar',
  templateUrl: './private-sidebar.component.html',
  styleUrls: ['./private-sidebar.component.css'],
})
export class PrivateSidebarComponent implements OnInit {
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
