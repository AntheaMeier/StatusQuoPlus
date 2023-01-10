import { Component, OnInit } from '@angular/core';
import  {MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../../../services/auth.service';
import { MoodEditComponent } from '../mood-edit/mood-edit.component';
import { Mood } from 'src/app/models/mood';
import { Feedback } from 'src/app/models/feedback';


@Component({
  selector: 'app-display-mood',
  templateUrl: './display-mood.component.html',
  styleUrls: ['./display-mood.component.css']
})
export class DisplayMoodComponent implements OnInit {

  idloggedInUser: string = '';
  feedbacks: Feedback[] = [];
  moods: Mood [] = [];
  Mood = { mood_date: new Date()}

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private api: ApiService,
    ) {}
 
  ngOnInit(): void {
    this.idloggedInUser = this.auth.getUserDetails()._id;
    this.getFeedback(this.idloggedInUser);
  }
  

  openDialog() {
    this.dialog.open(MoodEditComponent);
    this.Mood.mood_date = new Date();
  }

  getFeedback(idloggedInUser: string): any {
    console.log(idloggedInUser);
    this.api.getFeedbackWithName(idloggedInUser).subscribe(
      (res) => {
        console.log(res);
        this.feedbacks = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}