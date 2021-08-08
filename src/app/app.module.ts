import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';

import { WelcomeComponent } from './components/auth/welcome/welcome.component';
import { AuthPwMnFormComponent } from './components/auth/auth-pw-mn-form/auth-pw-mn-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadComponent } from './components/private/view/upload/upload.component';

import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { PublicNavbarComponent } from './components/public/navbar/public-navbar/public-navbar.component';
import { PrivateNavbarComponent } from './components/private/navbar/private-navbar/private-navbar.component';
import { PrivateSidebarComponent } from './components/private/sidebar/private-sidebar/private-sidebar.component';
import { PrivateSidebarItemComponent } from './components/private/sidebar/private-sidebar-item/private-sidebar-item.component';
import { DashboardComponent } from './components/private/view/dashboard/dashboard.component';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { environment } from 'src/environments/environment';
import { DownloadComponent } from './components/private/view/download/download.component';
import { DisplayQrComponent } from './components/private/view/display-qr/display-qr.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScanQrComponent } from './components/private/view/scan-qr/scan-qr.component';

const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'auth',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        {
          name: 'privateKey',
          keypath: 'privateKey',
          options: { unique: true },
        },
        { name: 'chainCode', keypath: 'chainCode', options: { unique: true } },
      ],
    },
  ],
};

@NgModule({
  declarations: [
    AppComponent,
    PublicNavbarComponent,
    PrivateNavbarComponent,
    WelcomeComponent,
    AuthPwMnFormComponent,
    UploadComponent,
    PrivateSidebarComponent,
    PrivateSidebarItemComponent,
    DashboardComponent,
    DownloadComponent,
    DisplayQrComponent,
    ScanQrComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    BrowserAnimationsModule,
    MatSidenavModule,
    QRCodeModule,
    ZXingScannerModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.THEGRAPH_URI,
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
