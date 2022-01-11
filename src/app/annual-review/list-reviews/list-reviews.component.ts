import {Component, OnInit} from '@angular/core';
import {Review} from '../../shared/review';
import {ApiService} from 'src/app/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-reviews',
  templateUrl: './list-reviews.component.html',
  styleUrls: ['./list-reviews.component.css']
})
export class ListReviewsComponent implements OnInit {

  edit = false;
  enteredContent = '';
  _id = '';
  date = '';
  description = '';
  isLoadingResults = true;
  review: Review = {id: '', date: '', description: ''};
  reviews: Review[] = [];
  idDialog: any = '';

  reviewForm: FormGroup = this.formBuilder.group({
    description: this.formBuilder.control('initial value', Validators.required)
  });

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {
  }

  getReviewDetails(id: any) {
    this.api.getReview(id)
      .subscribe((data: any) => {
        this.review = data;
        this.isLoadingResults = false;
      });
  }

  ngOnInit(): void {
    this.api.getReviews()
      .subscribe((res: any) => {
        this.reviews = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.getReviewDetails(this.route.snapshot.params.id);
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onFormSubmit(id: any) {
    this.isLoadingResults = true;
    this.api.updateReview(id, this.reviewForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/show-review', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  deleteDialog(id: any): void {
    this.idDialog = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '40%',
      data: {'id': this.idDialog}
    });
  }

  editOnOff() {
    this.edit = !this.edit;
  }
}
