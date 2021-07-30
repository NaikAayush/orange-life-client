import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ProxyReEncryptionKey } from './classes/ProxyReEncryptionKey';

@Injectable({
  providedIn: 'root',
})
export class UmbralService {
  umbral: typeof import('umbral-pre');
  constructor(private auth: AuthService) {}

  uploadFile(file: File) {
    const data: any = this.auth.getCredentials();
    const pk = data.pk;
    const key = new ProxyReEncryptionKey(this.umbral, pk);
  }
}
