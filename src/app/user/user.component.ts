import {Component, OnInit} from '@angular/core';
import {GraphqlService} from "../service/graphql.service";
import {map} from "rxjs";
import {Result} from "../domain/Result";

@Component({
  selector: 'app-person',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  results: Result[] = [];
  limit: number = 5;
  selectedGender: string = 'female,male';

  constructor(private graphqlService: GraphqlService) {
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.graphqlService
      .getUsers(this.limit, this.selectedGender)
      .pipe(map((val) => {
        this.results = val.data.root.results;
      }))
      .subscribe();
  }
}
