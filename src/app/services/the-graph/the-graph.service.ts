import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TheGraphService {
  GET_RECORD = gql`
    query GetRecords {
      medicalRecords(first: 5) {
        id
        idx
        owner
        docCID
      }
    }
  `;
  GET_MY_RECORD = gql`
    query GetRecords($address: String!) {
      medicalRecords(where: { owner: $address }) {
        id
        idx
        owner
        docCID
        docName
        hasAccess
        publicKey
        verifyingKey
        docMimeType
        nonce
      }
    }
  `;
  GET_OTHERS_RECORD = gql`
    query GetRecords($address: [String!]) {
      medicalRecords(where: { hasAccess_contains: $address }) {
        id
        idx
        owner
        docCID
        docName
        hasAccess
        publicKey
        verifyingKey
        docMimeType
        nonce
      }
    }
  `;
  private querySubscription;
  loading: boolean;
  posts: any;

  constructor(private apollo: Apollo, private auth: AuthService) {}

  async exampleQuery() {
    // return await this.apollo
    //   .query<any>({
    //     query: this.GET_OTHERS_RECORD,
    //   })
    //   .toPromise();
  }

  async getMyRecords() {
    const data = await this.auth.getCredentials();
    const address = data.address.toString().toLowerCase();
    console.log(address);

    return await this.apollo
      .query<any>({
        query: this.GET_MY_RECORD,
        variables: {
          address: address,
        },
      })
      .toPromise();
  }
  async getOthersRecords() {
    const data = await this.auth.getCredentials();
    const address = data.address.toString().toLowerCase();
    console.log(address);

    return await this.apollo
      .query<any>({
        query: this.GET_OTHERS_RECORD,
        variables: {
          address: [address],
        },
      })
      .toPromise();
  }
}
