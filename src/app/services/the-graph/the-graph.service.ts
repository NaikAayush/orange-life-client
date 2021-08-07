import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

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
  private querySubscription;
  loading: boolean;
  posts: any;

  constructor(private apollo: Apollo) {}

  async exampleQuery() {
    return await this.apollo
      .query<any>({
        query: this.GET_RECORD,
      })
      .toPromise();
  }
}
