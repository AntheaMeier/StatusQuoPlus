import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GoalsCreateComponent} from "../goals-create/goals-create.component";

@Component({
  selector: 'app-goals-edit',
  templateUrl: './goals-edit.component.html',
  styleUrls: ['./goals-edit.component.css']
})
export class GoalsEditComponent {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<GoalsCreateComponent>) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(GoalsEditComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
