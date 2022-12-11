import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TodoComponent} from "../todo.component";
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Tasks} from "../../../models/tasks";

@Component({
  selector: 'app-delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.css']
})
export class DeleteTaskDialogComponent implements OnInit {

  id: String =  '';
  task : Tasks = { _id: '', description: '', status: '', goalid: ''};
  isLoadingResults = false;
  articleForm: FormGroup =  this.formBuilder.group({
    description: this.formBuilder.control('initial value', Validators.required)
  });

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<TodoComponent>,
              private router: Router,
              private api: ApiService,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close('Close');
    this.dialog.closeAll();
  }

  ngOnInit() {}

  deleteTask(id: any) {
    this.dialogRef.close('Delete');
    this.isLoadingResults = true;
    this.api.deleteTask(id)
      .subscribe(res => {
          this.isLoadingResults = false;
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  onFormSubmit() {
    this.dialogRef.close('Delete');
    this.deleteTask(this.data._id);
    this.dialog.closeAll();
  }
}
