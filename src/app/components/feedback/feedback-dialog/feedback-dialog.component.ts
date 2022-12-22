import {Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import {Feedback} from '../../../models/feedback';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FeedbackCreateComponent} from "../feedback-create/feedback-create.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";
import { FormBuilder, FormGroup } from '@angular/forms'; //character limitation


@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.css'],
})
export class FeedbackDialogComponent implements OnInit {
  testfeedback: Feedback = {_id: '', provider_id: '', receiver_id: '', feedback_text: ''}
  idreceiver= '';
  enteredContent = '';
  idloggedInUser: string = '';
  userClicked: boolean = false;

  //character limitation
  myForm!: FormGroup; 
  maxChars = 500;
  
  constructor(
    public snackBar: MatSnackBar,
    private api: ApiService,
    private auth: AuthService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FeedbackCreateComponent>,
    
    //character limitation
    private fb: FormBuilder) {
    //character limitation
    this.buildForm();
    }

  ngOnInit(): void {
    this.idloggedInUser = this.auth.getUserDetails()._id;  
  }
  
  //character limitation
  buildForm() {
    this.myForm = this.fb.group({
      wordLimitation: [""]
    });
  }

  addFeedback(): void{
    this.testfeedback._id= "";
    this.testfeedback.provider_id = this.idloggedInUser;
    this.testfeedback.receiver_id = this.idreceiver;
    this.testfeedback.feedback_text = this.enteredContent;
    this.api.addFeedback(this.testfeedback).subscribe( res => {
        this.dialogRef.close();
      },
      (error: any) => {
        console.log(error);
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
    this.snackBar.openFromComponent(SnackBarComponent, {
      verticalPosition: 'bottom',
      panelClass: ['success'],
      duration: 2550,
    });
  }
}
