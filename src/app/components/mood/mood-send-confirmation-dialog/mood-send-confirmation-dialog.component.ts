import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Mood } from 'src/app/models/mood';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-mood-send-confirmation-dialog',
  templateUrl: './mood-send-confirmation-dialog.component.html',
  styleUrls: ['./mood-send-confirmation-dialog.component.css']
})
export class MoodSendConfirmationDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public mood: Mood,
    private api: ApiService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void { 
  }

  addMood(): void {
    console.log(this.mood);
    this.api.addMood(this.mood).subscribe(res => {
      this.dialog.closeAll();
    },
    (error: any) => {
      console.log(error);
    })
  }

}
