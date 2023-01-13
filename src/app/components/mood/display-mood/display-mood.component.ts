import { Component, OnInit } from '@angular/core';
import  {MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../../../services/auth.service';
import { Mood } from 'src/app/models/mood';
import {MoodEditComponent} from "../mood-edit/mood-edit.component";

@Component({
  selector: 'app-display-mood',
  templateUrl: './display-mood.component.html',
  styleUrls: ['./display-mood.component.css']
})
export class DisplayMoodComponent implements OnInit {

  idloggedInUser: string = '';
  moods: Mood [] = [];


  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private api: ApiService,
    ) {}

  ngOnInit(): void {
    this.idloggedInUser = this.auth.getUserDetails()._id;
    this.getMood(this.idloggedInUser);
  }

  getMood(idloggedInUser: string): any {
    console.log(idloggedInUser);
    this.api.getMoodForUser(idloggedInUser).subscribe(
      (res) => {
        console.log(res);
        this.moods = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  calculateIfEditable(creation_date: Date): boolean {
    let date2 = new Date(creation_date);
    let date1 = new Date();
    let time = date1.getTime() - date2.getTime();
    let days = (time / (1000 * 3600 * 24)) + 1; //Difference in Days*/
    if (days > 7) {
      return false;
    } else if (days <= 7) {
      return true;
    }
    return false;
  }

  openMoodEditDialog(mood: Mood) {
    const dialogRef = this.dialog.open(MoodEditComponent, {
      data: {mood: mood},
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
}
