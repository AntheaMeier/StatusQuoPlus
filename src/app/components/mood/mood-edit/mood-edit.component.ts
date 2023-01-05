import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import {Feedback} from '../../../models/feedback';
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

  testfeedback: Feedback = {_id: '', provider_id: '', receiver_id: '', feedback_text: '', feedback_date: new Date()}
  idreceiver= '';
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
    this.testfeedback._id= "";
    this.testfeedback.provider_id = this.idloggedInUser;
    this.testfeedback.receiver_id = this.idreceiver;
    this.testfeedback.feedback_text = this.enteredContent;
    this.testfeedback.feedback_date = new Date();
    console.log(this.testfeedback);

    const dialogRef = this.dialog.open(MoodSendConfirmationDialogComponent, {
      data: this.testfeedback
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.openSnackBar();
    });
  }

  setReceiverId(event: string) {
    this.userClicked = true;
    this.idreceiver = event;
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