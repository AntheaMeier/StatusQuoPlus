import { Component, OnInit } from '@angular/core';
import  {MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../../../services/auth.service';
import { MoodTrackenComponent } from '../mood-tracken/mood-tracken.component';
import { Mood } from 'src/app/models/mood';

@Component({
  selector: 'app-display-mood',
  templateUrl: './display-mood.component.html',
  styleUrls: ['./display-mood.component.css']
})
export class DisplayMoodComponent implements OnInit {

  idloggedInUser: string = '';
  moods: Mood[] = [];

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private api: ApiService,
    ) {}
  ngOnInit(): void {
    this.idloggedInUser = this.auth.getUserDetails()._id;
    this.getMood(this.idloggedInUser);
  }

  openDialog() {
    this.dialog.open(MoodTrackenComponent);
  }

  getMood(idloggedInUser: string): any {
    console.log(idloggedInUser);
    this.api.getMoodWithName(idloggedInUser).subscribe(
      (res) => {
        console.log(res);
        this.moods = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
