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

  public async uploadFile(client: ReturnType<typeof create>, file: File) {
    return await client.add(file);
  }

  public async uploadString(client: ReturnType<typeof create>, string: string) {
    return await client.add(string);
  }
}
