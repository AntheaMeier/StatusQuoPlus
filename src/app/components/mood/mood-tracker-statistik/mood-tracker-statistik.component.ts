import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {ApiService} from "../../../services/api.service";
import {Mood} from "../../../models/mood";
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../../../models/user";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

const THIRTY_SECONDS = 30000; // in ms
const TWO_SECONDS = 800; // in ms

@Component({
  selector: 'app-mood-tracker-statistik',
  templateUrl: './mood-tracker-statistik.component.html',
  styleUrls: ['./mood-tracker-statistik.component.css']
})
export class MoodTrackerStatistikComponent implements OnInit{
  idLoggedInUser?: string;
  happy: Mood[] = [];
  sad: Mood[] = [];
  neutral: Mood[] = [];
  happyCount: number = 0;
  neutralCount: number = 0;
  sadCount: number = 0;
  isLoading = false;
  timeoutId?: number;
  timeoutIdTwo?: number;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  users: User[] = [];
  myControl = new FormControl('');
  filteredUsers?: Observable<User[]>;
  showError: boolean = false;
  employeeId?: string;
  userClicked?: boolean;
  errorMessage?: string;

  providerId = '';

  constructor(private auth: AuthService,
              private api: ApiService) {
      this.getAllUsers();
      this.filteredUsers = this.myControl.valueChanges.pipe(
        startWith(''),
        map(state => (state ? this.filterStates(state) : this.users.slice())),
      );
  }

  ngOnInit(): void {
    this.providerId = this.auth.getUserDetails()._id;
    this.startTimer();
    this.getTeamMembers();
  }

  getTeamMembers(): void {
    this.idLoggedInUser = this.auth.getUserDetails()._id;
    this.getEmotions(this.idLoggedInUser as string);
  }

  getEmotions(supervisor_id: string): void {
    this.api.getMoodsOfTeam(supervisor_id).subscribe(
      (res: Mood[]) => {
        if(this.sortEmotions(this.fillArrays(res))) {
          this.stopTimer();
        }
      }, (err: any) => {
        this.stopTimer();
        console.log(err);
      });
  }

  fillArrays(moodArray: Mood[]): Mood[][] {
    let tempHappy: Mood[] = [];
    let tempNeutral: Mood[] = [];
    let tempSad: Mood[] = [];
    let tempAll: Mood[][] = [];

    moodArray.forEach(mood => {
      if (mood.emotion == 'happy') {
        this.happyCount++;
        tempHappy.push(mood);
      } else if (mood.emotion == 'sad') {
        this.sadCount++;
        tempSad.push(mood);
      } else if (mood.emotion == 'neutral') {
        this.neutralCount++;
        tempNeutral.push(mood);
      }
    });
    tempAll.push(tempHappy);
    tempAll.push(tempNeutral);
    tempAll.push(tempSad);
    return tempAll;

  }
  private sortEmotions(allMoodsClassified: Mood[][]): Boolean {
    this.happy =  allMoodsClassified[0].sort(function(a,b) {
      let date1 = new Date(a.creation_date);
      let date2 = new Date(b.creation_date);
      return date1.getTime() - date2.getTime();
    });

    this.neutral = allMoodsClassified[1].sort(function(a,b) {
      let date1 = new Date(a.creation_date);
      let date2 = new Date(b.creation_date);
      return date1.getTime() - date2.getTime();
    });

    this.sad = allMoodsClassified[2].sort(function(a,b) {
      let date1 = new Date(a.creation_date);
      let date2 = new Date(b.creation_date);
      return date1.getTime() - date2.getTime();
    });

    return true;
  }

  filterMood(): void {
    this.neutralCount = 0;
    this.sadCount = 0;
    this.happyCount = 0;

    let startDate = new Date(this.range.value.start);
    let endDate = new Date(this.range.value.end);

    this.startTimer();
    this.api.getMoodsOfTeamMember(this.idLoggedInUser, this.employeeId, startDate, endDate).subscribe(res => {
      console.log(res);
      if (res.length != 0) {
        if (this.sortEmotions(this.fillArrays(res))) {
          this.stopTimer();
        }
      } else {
        this.stopTimer();
        this.happy = [];
        this.sad = [];
        this.neutral = [];
      }
      this.employeeId = undefined;
    }, (err: any) => {
      this.stopTimer();
      console.log(err);
      this.employeeId = undefined;
    });
  }

  startTimer(): void {
    this.isLoading = true;
    this.timeoutId = window.setTimeout(() => {
      this.isLoading = false;
    }, THIRTY_SECONDS);
  }

  stopTimer(): void {
    clearTimeout(this.timeoutId);
    this.timeoutIdTwo = window.setTimeout(() => {
      this.stopTimerTwo();
    }, TWO_SECONDS);
  }

  stopTimerTwo(): void {
    this.isLoading = false;
    clearTimeout(this.timeoutIdTwo);
  }




  //SEARCH BAR

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
    this.employeeId = userId;
    this.setUserClicked(true);
  }

  setUserClicked(user: boolean): void {
    if(!user) {
      this.showError = true;
    } else {
      this.showError = false;
    }
    this.userClicked = user;
  }
}
