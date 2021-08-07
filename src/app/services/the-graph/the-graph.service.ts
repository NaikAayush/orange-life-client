import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

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
  private querySubscription: Subscription;
  loading: boolean;
  posts: any;

  constructor(private apollo: Apollo) {}

  exampleQuery() {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: this.GET_RECORD,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.posts = data.medicalRecords;
        console.log(data);
      });
  }
}
