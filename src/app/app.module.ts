import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicNavbarComponent } from './components/navbar/public-navbar/public-navbar.component';
import { PrivateNavbarComponent } from './components/navbar/private-navbar/private-navbar.component';
import { WelcomeComponent } from './components/auth/welcome/welcome.component';

@NgModule({
  declarations: [AppComponent, PublicNavbarComponent, PrivateNavbarComponent, WelcomeComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
