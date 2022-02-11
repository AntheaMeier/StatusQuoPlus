import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ListReviewsComponent } from '../list-reviews/list-reviews.component';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {

  @Input() idDialog: any;
  enteredValue = "";
  oldDescription: any;
  id = '';
  isLoadingResults = false;
  review!: Review;

  reviewForm: FormGroup = this.formBuilder.group({
    description: this.formBuilder.control('initial value', Validators.required),

  });

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ListReviewsComponent>,
              private router: Router, private route: ActivatedRoute,
              private api: ApiService, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ListReviewsComponent, {
      width: '80%',

    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getReview(this.data.id);
    this.reviewForm = this.formBuilder.group({
      'description': ['', Validators.required]
    });
  }

  getReview(id: any) {
    this.api.getReview(id).subscribe((data: any) => {
      this.id = data.id;
      this.oldDescription = data.description;
      this.reviewForm.setValue({
        description: data.description,
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateReview(this.data.id, this.reviewForm.value)
      .subscribe((res: any) => {
          this.isLoadingResults = false;
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
      this.dialogRef.close();
      this.reloadCurrentRoute();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
