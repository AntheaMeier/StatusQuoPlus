import { Component, OnInit } from '@angular/core';
import  {MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../../../services/auth.service';
import { FeedbackDialogComponent } from '../feedback-dialog/feedback-dialog.component';
import { Feedback } from 'src/app/models/feedback';

@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.css']
})
export class FeedbackCreateComponent implements OnInit {

  idloggedInUser: string = '';
  feedbacks: Feedback[] = [];

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
    this.dialog.open(FeedbackDialogComponent);
  }

  getFeedback(idloggedInUser: string): any {
    this.api.getFeedbackWithName(idloggedInUser).subscribe(
      (res) => {
        this.feedbacks = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
