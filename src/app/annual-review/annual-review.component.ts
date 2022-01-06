import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from '../services/api.service';
import {Review} from '../shared/review';

@Component({
  selector: 'app-annual-review',
  templateUrl: './annual-review.component.html',
  styleUrls: ['./annual-review.component.css']
})

export class AnnualReviewComponent implements OnInit {
  review!: Review;
  enteredContent = "";
  enteredDate = "";
  isLoadingResults = true;
  addPost = false;
  reviews: Review[] = [];

  constructor(private api: ApiService, 
    private router: Router) {
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
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onAddPost() {
    this.isLoadingResults = true;
    const simpleObject = {} as Review;
    simpleObject.date = this.enteredDate;
    simpleObject.description = this.enteredContent;
    this.api.addReview(simpleObject)
      .subscribe((res: any) => {
        this.isLoadingResults = false;
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.reloadCurrentRoute();
    this.addPost = false;
  }

  addPostForm() {
    this.addPost = !this.addPost;
  }
}
