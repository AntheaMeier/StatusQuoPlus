import {Component, OnInit, Input} from '@angular/core';

import {ApiService} from '../services/api.service';
import {Review} from '../shared/review';
import {ActivatedRoute, Router} from "@angular/router";
import {Login} from "../shared/login";
import {AuthService} from "../services/auth.service";
import * as moment from 'moment';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-annual-review',
  templateUrl: './annual-review.component.html',
  styleUrls: ['./annual-review.component.css']
})


export class AnnualReviewComponent implements OnInit {

   review!: Review;


  addPost = false;

  enteredContent = "";
  enteredDate!: string;
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
              private route: ActivatedRoute,
              private dateAdapter: DateAdapter<Date>,
              ) {
    this.currentUrl = router.url;
    console.log(this.currentUrl);
    this.dateAdapter.setLocale('de');

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
    var date = moment(this.enteredDate).format('DD.MM.yyyy');
    simpleObject.date = date;

    simpleObject.description = this.enteredContent;
    simpleObject.userid = id;
    this.api.addReview(simpleObject)
      .subscribe((res: any) => {
        this.isLoadingResults = false;
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.addPost = false;
    window.location.reload();
  }

  addPostForm() {
    this.addPost = !this.addPost;
  }



}
