import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ListReviewsComponent } from '../list-reviews/list-reviews.component';
import {ApiService} from '../../../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  oldDescription: any;
  id = '';
  isLoadingResults = false;


  articleForm: FormGroup = this.formBuilder.group({
    description: this.formBuilder.control('initial value', Validators.required)
  });

  constructor(public dialog: MatDialog,
              public dialogRef: MatDialogRef<ListReviewsComponent>,
              private api: ApiService,
              private router: Router,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any
              ) {}

  onNoClick(): void {
    this.dialog.closeAll();
  }

  ngOnInit() {
    this.getReview(this.data.id);
  }

  getReview(id: any) {
    this.api.getReview(id).subscribe((data: any) => {
      this.id = data.id;
      this.oldDescription = data.description;
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

  deleteReview(id: any) {
    this.isLoadingResults = true;
    this.api.deleteReview(id)
      .subscribe(res => {
          this.isLoadingResults = false;
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
      this.reloadCurrentRoute();
  }

  onFormSubmit() {
    this.deleteReview(this.data.id);
    this.dialog.closeAll();
  }
}

