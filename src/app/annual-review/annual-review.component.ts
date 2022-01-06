import {Component} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Review} from '../shared/review';
import {Router} from "@angular/router";

@Component({
  selector: 'app-annual-review',
  templateUrl: './annual-review.component.html',
  styleUrls: ['./annual-review.component.css']
})

export class AnnualReviewComponent {
  review!: Review;
  enteredContent = "";
  enteredDate = "";
  isLoadingResults = true;
  currentUrl = "";

  constructor(private api: ApiService, router: Router) {
    this.currentUrl = router.url;
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
    window.location.reload()
  }
}
