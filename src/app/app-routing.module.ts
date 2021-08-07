import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPwMnFormComponent } from './components/auth/auth-pw-mn-form/auth-pw-mn-form.component';
import { WelcomeComponent } from './components/auth/welcome/welcome.component';
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
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
