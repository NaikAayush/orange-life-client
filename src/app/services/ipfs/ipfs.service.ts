import { Injectable } from '@angular/core';
import { create } from 'ipfs-http-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  constructor() {}

  public connectToNetwork() {
    return create(environment.IPFS_GATEWAY as any);
  }

  public async uploadFile(client, file) {
    return await client.add(file);
  }

  public async uploadString(client, string) {
    return await client.add(string);
  }
}
