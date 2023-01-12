import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import {Mood} from '../../../models/mood';
import {MatDialog, MatDialogRef} from "@angular/material/dialog"
import {DisplayMoodComponent} from "../display-mood/display-mood.component";
import { MoodSendConfirmationDialogComponent } from '../mood-send-confirmation-dialog/mood-send-confirmation-dialog.component';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MoodSnackBarComponent} from "../mood-snack-bar/mood-snack-bar.component";
import {DeleteConfirmationDialogComponent} from "../../goals/delete-confirmation-dialog/delete-confirmation-dialog";


@Component({
  selector: 'app-mood-edit',
  templateUrl: './mood-edit.component.html',
  styleUrls: ['./mood-edit.component.css']
})
export class MoodEditComponent implements OnInit {

  mood: Mood = {id: '', creation_date: new Date(), creator_name: '', creator_id: '', emotion: '', text: '', hidden: false};
 // idreceiver= '';
  enteredContent = '';
  idloggedInUser: string = '';
  userClicked: boolean = false;

  constructor(
    public snackBar: MatSnackBar,
    private api: ApiService,
    private auth: AuthService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DisplayMoodComponent>) {}

  ngOnInit(): void {
    this.idloggedInUser = this.auth.getUserDetails()._id;
  }

  openDialog() {
    this.mood.id= "";
   
    this.mood.creation_date = new Date();
    console.log(this.mood);

    const dialogRef = this.dialog.open(MoodSendConfirmationDialogComponent, {
      data: this.mood
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.openSnackBar();
    });
  }

  setReceiverId(event: string) {
    this.userClicked = true;
   
  }

  setUserClicked($event: any) {
    this.userClicked = $event;
  }

  openSnackBar() {
    this.snackBar.openFromComponent(MoodSnackBarComponent, {
      verticalPosition: 'bottom',
      panelClass: ['success'],
      duration: 2550,
    });
  }
}