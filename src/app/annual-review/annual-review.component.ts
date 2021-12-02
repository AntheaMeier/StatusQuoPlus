import { Component } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { NgForm } from '@angular/forms';
import { Review } from '../shared/review';

@Component({
  selector: 'app-annual-review',
  templateUrl: './annual-review.component.html',
  styleUrls: ['./annual-review.component.css']
})

export class AnnualReviewComponent {
  enteredContent = "";
  enteredDate = "";

  isLoadingResults = true;
  
  constructor(private api: ApiService) {}

  onAddPost(form: NgForm) {
    if (form.invalid)
    {
        return;
    }
    
   // this.api.addReview(form.value.title);
    form.resetForm();
}

}
