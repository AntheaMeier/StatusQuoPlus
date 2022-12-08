import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import  {MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../../../services/auth.service';
import { FeedbackDialogComponent } from '../feedback-dialog/feedback-dialog.component';
import { Feedback } from 'src/app/models/feedback';
import { LoginData } from 'src/app/models/loginData';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.css']
})
export class FeedbackCreateComponent implements OnInit {
  
  idloggedInUser: '' = '';
  idMember: any;
  feedbacks: Feedback[] = [];
  
  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    ) {}
 
  ngOnInit(): void {
    this.idloggedInUser = this.auth.getUserDetails()._id;
    this.getFeedback(this.idloggedInUser);
  }

  openDialog() {
    this.dialog.open(FeedbackDialogComponent);
  }

  getFeedback(idloggedInUser: string) {
    console.log(idloggedInUser);
    this.api.getFeedbackForUser(idloggedInUser).subscribe(
      (res) => {
        this.feedbacks = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
