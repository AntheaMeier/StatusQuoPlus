import {Component, OnInit, Input} from '@angular/core';

import {ApiService} from '../services/api.service';
import {Review} from '../shared/review';
import {ActivatedRoute, Router} from "@angular/router";
import {Login} from "../shared/login";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-annual-review',
  templateUrl: './annual-review.component.html',
  styleUrls: ['./annual-review.component.css']
})


export class AnnualReviewComponent implements OnInit {

   review!: Review;

  addPost = false;

  enteredContent = "";
  enteredDate = "";
  isLoadingResults = true;
  currentUrl = "";

  @Input() idTeamMember: any = "";
  @Input() selectedRole : String = "";

  idloggedInUser: String = "";
  dataUsers: Login[] = [];
  showReviewsToOneUser = false;
  @Input() reviewsToOneUser: Review[] = [];
  @Input() idTeam  = "";

  constructor(private api: ApiService,
              private auth: AuthService,
              private router: Router,
     private route: ActivatedRoute) {
    this.currentUrl = router.url;
    console.log(this.currentUrl);

  }


  ngOnInit() {
    this.currentUrl = this.router.url;

    if(this.currentUrl != '/protokolle'){
      this.selectedRole='Vorgesetzte_r'
    }

    this.api.getUsers()
      .subscribe((res: any) => {
        this.dataUsers = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.idloggedInUser = this.auth.getUserDetails().user_info._id;

  }

    reloadCurrentRoute() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([this.currentUrl]);
    });}

  onAddPost(id: any) {
    if(this.selectedRole == "Vorgesetzte_r") {
     id = this.idTeamMember;
    }
     this.currentUrl = this.router.url;


    this.isLoadingResults = true;
    const simpleObject = {} as Review;
    simpleObject.date = this.enteredDate;
    console.log(this.enteredDate);
    simpleObject.description = this.enteredContent;
    simpleObject.userid = id;
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
