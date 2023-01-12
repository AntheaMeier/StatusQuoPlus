import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Mood } from 'src/app/models/mood';

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
  ) { }

  ngOnInit(): void {}

  trackMood(): void {
    console.log(this.mood);
    this.api.trackMood(this.mood).subscribe(res => {
      this.dialog.closeAll();
    },
    (error: any) => {
      console.log(error);
    })
  }
}
