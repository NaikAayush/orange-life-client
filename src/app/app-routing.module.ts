import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPwMnFormComponent } from './components/auth/auth-pw-mn-form/auth-pw-mn-form.component';
import { WelcomeComponent } from './components/auth/welcome/welcome.component';
import { DashboardComponent } from './components/private/view/dashboard/dashboard.component';
import { DownloadComponent } from './components/private/view/download/download.component';
import { RecordRenderComponent } from './components/private/view/records/record-render/record-render.component';
import { RecordsComponent } from './components/private/view/records/records.component';
import { UploadComponent } from './components/private/view/upload/upload.component';

const routes: Routes = [
  {
    path: 'auth',
    component: WelcomeComponent,
  },
  {
    path: 'auth/:type',
    component: AuthPwMnFormComponent,
  },
  {
    path: 'upload',
    component: UploadComponent,
    data: { title: 'Upload' },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' },
  },
  {
    path: 'download',
    component: DownloadComponent,
    data: { title: 'Download' },
  },
  {
    path: 'records',
    component: RecordsComponent,
    data: { title: 'Medical Records' },
  },
  {
    path: 'record/:id/:pk/:vk/:docName/:docMimeType/:docMimeType1',
    component: RecordRenderComponent,
    data: { title: 'Record' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
