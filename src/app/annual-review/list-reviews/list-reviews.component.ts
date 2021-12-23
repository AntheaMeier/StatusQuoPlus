import {Component, OnInit} from '@angular/core';
import {Review} from '../../shared/review';
import {ApiService} from 'src/app/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  reviewForm: FormGroup = this.formBuilder.group({
    description: this.formBuilder.control('initial value', Validators.required)
  });

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
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

  deleteReview(id: any) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.isLoadingResults = true;
      this.api.deleteReview(id)
        .subscribe(res => {
            this.isLoadingResults = false;
            this.router.navigate(['/articles']);
          }, (err) => {
            console.log(err);
            this.isLoadingResults = false;
          }
        );
      this.ngOnInit();
    }
  }

  editOnOff() {
    this.edit = !this.edit;
  }
}
