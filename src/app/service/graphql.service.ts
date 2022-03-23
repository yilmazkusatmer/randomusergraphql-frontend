import { Injectable } from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {Observable} from "rxjs";
import {DataObject} from "../domain/DataObject";
import {Result} from "../domain/Result";

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  private users = gql`
    query getUsers($limit: Int, $gender: String){
      root(limit: $limit, gender: $gender) {
        results {
          name {
            first
            last
          }
          picture {
            large
          }
          location{
            city
            country
          }
        }
      }
    }
  `;

  constructor(private apollo: Apollo) { }

  getUsers(limit: number, gender: string): Observable<any> {
    return this.apollo.watchQuery({
      query: this.users,
      variables:{
        limit: limit,
        gender: gender
      },
      fetchPolicy: "no-cache"
    }).valueChanges;
  }


}
