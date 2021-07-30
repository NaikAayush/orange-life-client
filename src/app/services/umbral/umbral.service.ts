import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UmbralService {
  umbral: typeof import('umbral-pre');
  constructor(private auth: AuthService) {}

  uploadFile() {
    const pk = this.auth.getCredentials();
  }
}
