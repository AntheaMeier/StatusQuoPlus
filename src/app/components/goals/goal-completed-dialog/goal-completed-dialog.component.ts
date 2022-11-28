import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoalsCreateComponent } from '../goals-create/goals-create.component';

@Component({
  selector: 'app-goal-completed-dialog',
  templateUrl: './goal-completed-dialog.component.html',
  styleUrls: ['./goal-completed-dialog.component.css']
})
export class GoalCompletedDialogComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    public dialogRef: MatDialogRef<GoalsCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.dialog.closeAll();
  }

}
