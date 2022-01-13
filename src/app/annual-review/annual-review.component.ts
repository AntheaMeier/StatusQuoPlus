import {Component, Input} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Review} from '../shared/review';
import {Router} from "@angular/router";
import {Login} from "../shared/login";
import {AuthService} from "../services/auth.service";

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

  @Input() idTeamMember = "";
  @Input() selectedRole : String = "";

  idloggedInUser: String = "";
  dataUsers: Login[] = [];
  showReviewsToOneUser = false;
  @Input() reviewsToOneUser: Review[] = [];
  @Input() idTeam = "";

  constructor(private api: ApiService,
              private auth: AuthService,
              router: Router) {
    this.currentUrl = router.url;
    console.log(this.currentUrl);

  }


  ngOnInit() {
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

  onAddPost(id: any) {
    if(this.selectedRole == "Vorgesetzte_r"){
     id = this.idTeamMember;
    }
    this.isLoadingResults = true;
    const simpleObject = {} as Review;
    simpleObject.date = this.enteredDate;
    simpleObject.description = this.enteredContent;
    simpleObject.userid = id;
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
