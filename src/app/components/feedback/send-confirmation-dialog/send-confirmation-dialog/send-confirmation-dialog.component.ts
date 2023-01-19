import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Feedback } from 'src/app/models/feedback';
import { ApiService } from 'src/app/services/api.service';
import {FeedbackCreateComponent} from "../../feedback-create/feedback-create.component";

@Component({
  selector: 'app-send-confirmation-dialog',
  templateUrl: './send-confirmation-dialog.component.html',
  styleUrls: ['./send-confirmation-dialog.component.css']
})
export class SendConfirmationDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public feedback: Feedback,
    private api: ApiService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FeedbackCreateComponent>,
  ) { }

  ngOnInit(): void {
  }

  addFeedback(): void {
    this.api.addFeedback(this.feedback).subscribe(res => {
      this.dialogRef.close(1);
    },
    (error: any) => {
      console.log(error);
    })
  }

}
