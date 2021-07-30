import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { PublicNavbarComponent } from './components/navbar/public-navbar/public-navbar.component';
import { PrivateNavbarComponent } from './components/navbar/private-navbar/private-navbar.component';
import { WelcomeComponent } from './components/auth/welcome/welcome.component';
import { AuthPwMnFormComponent } from './components/auth/auth-pw-mn-form/auth-pw-mn-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadComponent } from './components/dashboard/upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    HttpClientModule,
    PublicNavbarComponent,
    PrivateNavbarComponent,
    WelcomeComponent,
    AuthPwMnFormComponent,
    UploadComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
