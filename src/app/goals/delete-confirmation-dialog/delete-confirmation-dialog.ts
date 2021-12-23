import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GoalsCreateComponent} from "../goals-create/goals-create.component";
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Tasks} from "../../shared/tasks";

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.css'],
})

export class DeleteConfirmationDialogComponent implements OnInit {

  oldDescription: any;
  id = '';
  isLoadingResults = false;
  isLoadingResultsTasksToGoal = false;
  tasksToOneGoal: Tasks[] = [];

  articleForm: FormGroup = this.formBuilder.group({
    description: this.formBuilder.control('initial value', Validators.required)
  });

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<GoalsCreateComponent>,
              private router: Router, private api: ApiService, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

  ngOnInit() {
    this.getArticle(this.data.id);
  }

  getArticle(id: any) {
    this.api.getGoal(id).subscribe((data: any) => {
      this.id = data.id;
      this.oldDescription = data.description;
      this.articleForm.setValue({
        description: data.description,
      });
    });
  }

  deleteGoal(id: any) {
    this.isLoadingResults = true;
    this.api.deleteGoal(id)
      .subscribe(res => {
          this.isLoadingResults = false;
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
    this.api.getTasksToGoal(id)
      .subscribe((res: any) => {
        this.tasksToOneGoal = res;
        console.log('das ist res ' + res[0]._id)
        let taskId = ''
        for (let i = 0; i < res.length; i++) {
          taskId = res[i]._id;
          this.api.deleteTask(taskId)
            .subscribe(res => {
                this.isLoadingResults = false;
              }, (err) => {
                console.log(err);
                this.isLoadingResults = false;
              }
            );
        }
        this.isLoadingResultsTasksToGoal = false;
      }, err => {
        console.log(err);
        this.isLoadingResultsTasksToGoal = false;
      });
    window.location.reload()
  }

  onFormSubmit() {
    this.deleteGoal(this.data.id);
    this.dialog.closeAll();
  }
}


