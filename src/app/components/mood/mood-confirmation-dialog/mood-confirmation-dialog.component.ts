import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Mood } from 'src/app/models/mood';
import {GoalsCreateComponent} from "../../goals/goals-create/goals-create.component";

@Component({
  selector: 'app-mood-confirmation-dialog',
  templateUrl: './mood-confirmation-dialog.component.html',
  styleUrls: ['./mood-confirmation-dialog.component.css']
})
export class MoodConfirmationDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public mood: Mood,
    private api: ApiService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MoodConfirmationDialogComponent>,
  ) { }

  ngOnInit(): void {}

  trackMood(): void {
    this.api.trackMood(this.mood).subscribe(res => {
      this.dialogRef.close(1);
    },
    (error: any) => {
      console.log(error);
    })
  }
}
