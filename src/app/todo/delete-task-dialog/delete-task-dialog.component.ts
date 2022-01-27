import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TodoComponent} from "../todo.component";
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.css']
})
export class DeleteTaskDialogComponent implements OnInit {

  id =  '';
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
    this.dialog.closeAll();
  }

  ngOnInit() {
    this.getTodo(this.data.id);
  }

  getTodo(id: any) {
    this.api.getTodo(id).subscribe((data: any) => {
      this.id = data.id;
      this.articleForm.setValue({
        description: data.description,
      });
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  deleteGoal(id: any) {
    this.isLoadingResults = true;
    this.api.deleteTask(id)
      .subscribe(res => {
          this.isLoadingResults = false;
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
       );
    this.reloadCurrentRoute();
    window.location.reload()
  }

  onFormSubmit() {
    this.deleteGoal(this.data.id);
    this.dialog.closeAll();
  }

}
