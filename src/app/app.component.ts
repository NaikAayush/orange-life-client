import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Web3Service } from './services/web3/web3.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';
  mode: string;
  backdrop: string;
  menuState: boolean = false;
  // menuItems = ['Dashboard', 'Medical Records', 'Requests', 'Trusted Contacts'];

  mobile: boolean;
  events: string[] = [];
  opened: boolean;
  data: any;

  constructor(
    private web3: Web3Service,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
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

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        var rt = this.getChild(this.activatedRoute);

        rt.data.subscribe((data) => {
          console.log(data);
          this.data = data;
          this.titleService.setTitle(data.title);
        });
      });
  }
  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
