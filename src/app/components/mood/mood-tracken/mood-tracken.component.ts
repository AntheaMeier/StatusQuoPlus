import { Component, OnInit } from '@angular/core';
import { Mood } from '../../../models/mood';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MoodConfirmationDialogComponent } from '../mood-confirmation-dialog/mood-confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MoodSnackbarComponent } from '../mood-snackbar/mood-snackbar.component';

@Component({
  selector: 'app-mood-tracken',
  templateUrl: './mood-tracken.component.html',
  styleUrls: ['./mood-tracken.component.css']
})
export class MoodTrackenComponent implements OnInit {

  moodTest: Mood = {id: '', creation_date: new Date(), creator_name: '', creator_id: '', text: '', emotion: '', hidden: false};
  enteredContent = '';
  selectedEmotion: string = '';
  emotions: string[] = ['sad', 'neutral', 'happy'];
  idloggedInUser: string = '';
  nameLoggedInUser: string = '';
  hideComment: boolean = false;


  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.idloggedInUser = this.auth.getUserDetails()._id;
    this.nameLoggedInUser = this.auth.getUserDetails().firstname + ' ' + this.auth.getUserDetails().surname;
  }

  openDialog() {
    this.moodTest.id= "";
    this.moodTest.creation_date = new Date();
    this.moodTest.creator_name = this.nameLoggedInUser;
    this.moodTest.creator_id = this.idloggedInUser;
    this.moodTest.text = this.enteredContent;
    this.moodTest.emotion = this.selectedEmotion;
    this.moodTest.hidden = this.hideComment;

    const dialogRef = this.dialog.open(MoodConfirmationDialogComponent, {
      data: this.moodTest
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.openSnackBar();
      this.selectedEmotion = '';
      this.enteredContent = '';
      this.hideComment = false;
    });
  }

  openSnackBar() {
    this.snackBar.openFromComponent(MoodSnackbarComponent, {
      verticalPosition: 'bottom',
      panelClass: ['success'],
      duration: 2550,
    });
  }

  onSelect(e: any) {
    this.selectedEmotion = e.target.value;
    console.log(this.selectedEmotion);
  }

  changeState() {
    if (this.hideComment) {
      this.hideComment = false;
    }
    else if (!this.hideComment) {
      this.hideComment = true;
    }
  }

}
