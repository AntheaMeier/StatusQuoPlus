import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GoalsCreateComponent} from "../goals-create/goals-create.component";
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */


@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.css'],
})

  export class DeleteConfirmationDialogComponent implements OnInit {

  oldDescription: any;

  articleForm: FormGroup =  this.formBuilder.group({
    description: this.formBuilder.control('initial value', Validators.required)
  });
  
  id = '';
  isLoadingResults = false;


  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<GoalsCreateComponent>,
                private router: Router, private api: ApiService, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialog.closeAll();
  }

  ngOnInit() {
    this.getArticle(this.data.id);

  }

  getArticle(id: any) {
    this.api.getArticle(id).subscribe((data: any) => {
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
          this.router.navigate(['/articles']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  onFormSubmit() {
    this.deleteGoal(this.data.id);
    this.dialog.closeAll();
  }
}


