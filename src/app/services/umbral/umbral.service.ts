import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ProxyReEncryptionKey } from './classes/ProxyReEncryptionKey';
import { EncryptedData } from './classes/EncryptedData';
import { environment } from 'src/environments/environment';

class GrantParams {
  constructor(
    public delegating_pk: string,
    public receiving_pk: string,
    public verifying_key: string,
    public capsule: string,
    public kfrag: string
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class UmbralService {
  umbral: typeof import('umbral-pre');

  // umbral ursulas
  // TODO: make this environment var
  // TODO: ensure 3 ursulas
  private ursulaDomains = environment.URSULA_DOMAINS.split(',');

  constructor(private auth: AuthService, private http: HttpClient) {}

  private async importUmbralIfNotAlready() {
    if (!this.umbral) {
      this.umbral = await import('umbral-pre');
    }
  }

  async uploadFile(file: File) {
    await this.importUmbralIfNotAlready();

    const creds = await this.auth.getCredentials();
    const key = new ProxyReEncryptionKey(this.umbral, creds.pk, creds.chainCode);

    const fileBytes = new Uint8Array(await file.arrayBuffer())
    const encryptedData = key.encryptBytes(fileBytes, key.publicKey);

    await this.sendData(encryptedData);

    return encryptedData;
  }

  private async sendData(data: EncryptedData) {
    const hexData = data.toHex();

    if (hexData.kfrags.length > this.ursulaDomains.length) {
      console.log(
        `Not enough ursulas for ${hexData.kfrags.length} fragments. Have ${this.ursulaDomains.length} ursulas.`
      );
      return;
    }

    const promises = [];
    for (let i = 0; i < hexData.kfrags.length; ++i) {
      const kfrag = hexData.kfrags[i];
      const bodyParams = new GrantParams(
        hexData.delegatingPubKey,
        hexData.receivingPubKey,
        hexData.verifyKey,
        hexData.capsule,
        kfrag
      );

      const res = this.http.post<GrantParams>(`${this.ursulaDomains[i]}/v1/grant`, bodyParams).toPromise();
      promises.push(res);
    }

    const resps = await Promise.all(promises);
    resps.forEach((resp) => {
      console.log("Response from ursula", resp);
    });
  }
}
