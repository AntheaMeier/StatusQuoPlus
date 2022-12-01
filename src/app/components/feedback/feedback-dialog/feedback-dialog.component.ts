import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import {Feedback} from '../../../models/feedback';


@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.css']
})
export class FeedbackDialogComponent implements OnInit {
  testfeedback: Feedback = {_id: "", providerId: "", receiverId: "", feedbackText: ""}
  idreceiver= "635bf1fe79ec9e6f7ab8b9ea";
  enteredContent = '';
  idloggedInUser: string = '';
  constructor(    
    private api: ApiService,
    private auth: AuthService,
    ) { }

  ngOnInit(): void {
    this.idloggedInUser = this.auth.getUserDetails()._id;
    console.log(this.idloggedInUser);
  }

  addFeedback(): void{
    this.testfeedback._id= "";
    this.testfeedback.providerId = this.idloggedInUser;
    this.testfeedback.receiverId = this.idreceiver;
    this.testfeedback.feedbackText = this.enteredContent;
    console.log(this.testfeedback);
    this.api.addFeedback(this.testfeedback).subscribe();
  }

}
