import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-sidebar',
  templateUrl: './private-sidebar.component.html',
  styleUrls: ['./private-sidebar.component.css'],
})
export class PrivateSidebarComponent implements OnInit {
  menuState: boolean = false;
  menuItems = [
    {
      name: 'Dashboard',
      svg: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      route: 'dashboard',
    },
    {
      name: 'Medical Records',
      svg: 'M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2',
      route: 'records',
    },
    {
      name: 'Requests',
      svg: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
      route: 'requests',
    },
    {
      name: 'Trusted Contacts',
      svg: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      route: 'trusted',
    },
    {
      name: 'My Trusted Contact Records',
      svg: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      route: 'trusted-records',
    },
  ];

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
