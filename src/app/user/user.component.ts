import {Component, OnInit} from '@angular/core';
import {GraphqlService} from "../service/graphql.service";
import {map, Subscription} from "rxjs";
import {User} from "../domain/User";


@Component({
  selector: 'app-person',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  limit: number = 5;
  selectedGender: string = 'female,male';
  subscription!: Subscription;

  constructor(private graphqlService: GraphqlService) {
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
     this.subscription = this.graphqlService
      .getUsers(this.limit, this.selectedGender)
      .pipe(map((val) => {
        this.users = val.data.root.users;
      }))
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
