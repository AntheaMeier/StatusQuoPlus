import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FeedbackDialogComponent } from '../feedback-dialog/feedback-dialog.component';

@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.css']
})
export class FeedbackCreateComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
 


  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(FeedbackDialogComponent);
  }


  
}
