import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import {Mood} from '../../../models/mood';
import {MatDialog, MatDialogRef} from "@angular/material/dialog"
import {DisplayMoodComponent} from "../display-mood/display-mood.component";
import { MoodSendConfirmationDialogComponent } from '../mood-send-confirmation-dialog/mood-send-confirmation-dialog.component';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MoodSnackBarComponent} from "../mood-snack-bar/mood-snack-bar.component";


@Component({   
  selector: 'app-mood-tracken',
  templateUrl: './mood-tracken.component.html',
  styleUrls: ['./mood-tracken.component.css']
})
export class MoodTrackenComponent implements OnInit {

  testmood: Mood = {_id: '', provider_id: '', receiver_id: '', mood_text: '', mood_date: new Date()}
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
    this.testmood._id= "";
    this.testmood.provider_id = this.idloggedInUser;
    this.testmood.receiver_id = this.idreceiver;
    this.testmood.mood_text = this.enteredContent;
    this.testmood.mood_date = new Date();
    console.log(this.testmood);

    const dialogRef = this.dialog.open(MoodSendConfirmationDialogComponent, {
      data: this.testmood
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
