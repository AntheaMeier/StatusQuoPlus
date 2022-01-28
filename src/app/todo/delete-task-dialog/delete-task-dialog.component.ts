import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TodoComponent} from "../todo.component";
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Tasks} from "../../shared/tasks";
@Component({
  selector: 'app-delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.css']
})
export class DeleteTaskDialogComponent implements OnInit {
  oldDescription: any;

  articleForm: FormGroup =  this.formBuilder.group({
    description: this.formBuilder.control('initial value', Validators.required)
  });




  id :String =  '';
  isLoadingResults = false;
  task : Tasks = { _id: '', description: '', status: '', goalid: ''};



  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<TodoComponent>,
              private router: Router, private api: ApiService, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {

    this.dialogRef.close('Close');



    this.dialog.closeAll();
  }

  ngOnInit() {

  }



  deleteGoal(id: any) {
    this.dialogRef.close('Delete');


    console.log('das ist die id ' + id);
    this.isLoadingResults = true;
    this.api.deleteTask(id)
      .subscribe(res => {
          this.isLoadingResults = false;
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );

    window.location.reload();

  }

  onFormSubmit() {

    this.dialogRef.close('Delete');
    this.deleteGoal(this.data._id);
    this.dialog.closeAll();
  }

}
