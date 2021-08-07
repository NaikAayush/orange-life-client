import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { create } from 'ipfs-http-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  constructor(private http: HttpClient) {}

  public connectToNetwork() {
    return create(environment.IPFS_GATEWAY as any);
  }

  public async uploadFile(client: ReturnType<typeof create>, file: File) {
    return await client.add(file);
  }

  public async uploadString(client: ReturnType<typeof create>, string: string) {
    return await client.add(string);
  }

  public async downloadFile(docid: string) {
    return await this.http
      .get(environment.IPFS_GATEWAY + '/ipfs/' + docid, {
        responseType: 'blob',
      })
      .toPromise();
  }
}
