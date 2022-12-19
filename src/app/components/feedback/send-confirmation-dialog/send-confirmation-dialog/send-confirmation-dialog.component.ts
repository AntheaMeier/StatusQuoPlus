import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Feedback } from 'src/app/models/feedback';
import { ApiService } from 'src/app/services/api.service';

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
  ) { }

  ngOnInit(): void {
  }

  addFeedback(): void {
    console.log(this.feedback);
    this.api.addFeedback(this.feedback).subscribe(res => {
      this.dialog.closeAll();
    },
    (error: any) => {
      console.log(error);
    })
  }

}
