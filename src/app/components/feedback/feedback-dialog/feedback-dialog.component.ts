import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import {Feedback} from '../../../models/feedback';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GoalsCreateComponent} from "../../goals/goals-create/goals-create.component";
import {FeedbackCreateComponent} from "../feedback-create/feedback-create.component";


@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.css']
})
export class FeedbackDialogComponent implements OnInit {
  testfeedback: Feedback = {_id: '', provider_id: '', receiver_id: '', feedback_text: ''}
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

  addFeedback(): void{
    this.testfeedback._id= "";
    this.testfeedback.provider_id = this.idloggedInUser;
    this.testfeedback.receiver_id = this.idreceiver;
    this.testfeedback.feedback_text = this.enteredContent;
    console.log(this.testfeedback);
    this.api.addFeedback(this.testfeedback).subscribe( res => {
        this.dialogRef.close();
      },
      (error: any) => {
        console.log(error);
    });
  }

  setReceiverId(event: string) {
    console.log('Die Id in Feedback: ' + event);
    this.idreceiver = event;
  }
}
