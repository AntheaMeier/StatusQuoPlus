import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {User} from "../../../models/user";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  users: User[] = [];
  myControl = new FormControl('');
  filteredUsers?: Observable<User[]>;
  showError: boolean = false;
  @Output() receiverId = new EventEmitter<string>();
  @Output() userClicked = new EventEmitter<boolean>();

  constructor(private api: ApiService) {
    this.getAllUsers();
    this.filteredUsers = this.myControl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this.filterStates(state) : this.users.slice())),
    );
  }

  getAllUsers() {
    this.api.getUsers().subscribe( (res: any) => {
      res.forEach( (user: { firstname: string; surname: string; _id: any; }) => {
        let userTemp: User = {name: (user.firstname + ' ' + user.surname), _id: user._id};
        console.log(userTemp);
        this.users.push(userTemp);
      })
    });
  }

  filterStates(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(user => user.name.toLowerCase().includes(filterValue));
  }

  chooseUser(userId: string): void {
    this.receiverId.emit(userId);
    this.setUserClicked(true);
  }

  setUserClicked(test: boolean): void {
    if(!test) {
      this.showError = true;
    } else {
      this.showError = false;
    }
    this.userClicked.emit(test);
  }
}
