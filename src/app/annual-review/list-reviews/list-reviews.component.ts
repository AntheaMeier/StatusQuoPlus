import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../../shared/review';
import {ApiService} from 'src/app/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Login} from "../../shared/login";
import {AuthService} from "../../services/auth.service";

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
  review: Review = {_id: '', date: '', description: '', userid: ''};
  idloggedInUser: String = "";
  dataUsers: Login[] = [];
  showReviewsToOneUser = false;
  @Input() idTeam = "";
  @Input() reviewsToOneUser: Review[] = [];

  reviewForm: FormGroup = this.formBuilder.group({
    description: this.formBuilder.control('initial value', Validators.required)
  });

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private auth: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.api.getUsers()
      .subscribe((res: any) => {
        this.dataUsers = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.idloggedInUser = this.auth.getUserDetails().user_info._id;
    if (this.idTeam == "") {
      this.getReviewDetails(this.idloggedInUser);
    } else {
      this.getReviewDetails(this.idTeam)
    }
    this.api.getReviewsToUser(this.idloggedInUser)
      .subscribe((res: any) => {
        this.reviewsToOneUser = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.getReviewDetails(this.route.snapshot.params.id);
  }

  getReviewDetails(id: any) {
    this.api.getReviewsToUser(id)
      .subscribe((data: any) => {
        this.reviewsToOneUser = data;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.showReviewsToOneUser = true;
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
