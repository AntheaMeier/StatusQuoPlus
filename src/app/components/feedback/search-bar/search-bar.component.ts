import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {User} from "../../../models/user";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit{

  users: User[] = [];
  myControl = new FormControl('');
  filteredUsers?: Observable<User[]>;
  showError: boolean = false;
  @Output() receiverId = new EventEmitter<string>();
  @Output() userClicked = new EventEmitter<boolean>();

  providerId = '';

  constructor(private api: ApiService, private auth: AuthService) {
    this.getAllUsers();
    this.filteredUsers = this.myControl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this.filterStates(state) : this.users.slice())),
    );
  }

  ngOnInit(): void {
    this.providerId = this.auth.getUserDetails()._id;
  }

  getAllUsers() {
    this.api.getUsers().subscribe( (res: any) => {
      res.forEach( (user: { firstname: string; surname: string; _id: any; }) => {
        if(user._id != this.providerId) {
          let userTemp: User = {name: (user.firstname + ' ' + user.surname), _id: user._id};
          this.users.push(userTemp);
        }
      })
      this.users.sort((a, b) => a.name.localeCompare(b.name));
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

  setUserClicked(user: boolean): void {
    if(!user) {
      this.showError = true;
    } else {
      this.showError = false;
    }
    this.userClicked.emit(user);
  }
}
