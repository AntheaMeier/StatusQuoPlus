import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import {Feedback} from '../../../models/feedback';
import {MatDialog, MatDialogRef} from "@angular/material/dialog"
import {FeedbackCreateComponent} from "../feedback-create/feedback-create.component";
import { SendConfirmationDialogComponent } from '../send-confirmation-dialog/send-confirmation-dialog/send-confirmation-dialog.component';


@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.css']
})
export class FeedbackDialogComponent implements OnInit {

  testfeedback: Feedback = {_id: '', provider_id: '', receiver_id: '', feedback_text: '', feedback_date: new Date()}
  idreceiver= '';
  enteredContent = '';
  idloggedInUser: string = '';

  constructor(
    private api: ApiService,
    private auth: AuthService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FeedbackCreateComponent>) {}

  ngOnInit(): void {
    this.idloggedInUser = this.auth.getUserDetails()._id;
    console.log(this.idloggedInUser);
  }

  openDialog() {
    this.testfeedback._id= "";
    this.testfeedback.provider_id = this.idloggedInUser;
    this.testfeedback.receiver_id = this.idreceiver;
    this.testfeedback.feedback_text = this.enteredContent;
    this.testfeedback.feedback_date = new Date();
    console.log(this.testfeedback);
    this.dialog.open(SendConfirmationDialogComponent, {
      data: this.testfeedback
    });
  }

  setReceiverId(event: string) {
    console.log('Die Id in Feedback: ' + event);
    this.idreceiver = event;
  }
}
