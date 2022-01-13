import {Component, OnInit} from '@angular/core';
import {Goals} from "../shared/goals";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {Review} from "../shared/review";

@Component({
  selector: 'app-teamview',
  templateUrl: './teamview.component.html',
  styleUrls: ['./teamview.component.css']
})
export class TeamviewComponent implements OnInit {
  reviewsToOneUser: Review[] = [];

  submitted = false;
  isLoadingResults = true;
  goalid: string = "";
  idMember = "";
  goalsToOneUser: Goals[] = [];
  selectedRole = "";
  data = {userid: '', selectedRole: ''};

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private api: ApiService,
  ) {}


  loadReviews(userid: string) {
    this.api.getReviewsToUser(userid)
      .subscribe((res: any) => {
        this.reviewsToOneUser = res;
      }, err => {
        console.log(err);
      });


  }



  ngOnInit(): void {
    if(history.state.data != null) {
      this.data = history.state.data;
      this.idMember = this.data.userid;
      this.selectedRole = this.data.selectedRole;
      console.log('die aktuelle userid: ' + this.idMember + 'und die Rolle: ' + this.selectedRole);
      this.loadGoals(this.idMember);
      this.loadReviews(this.idMember);
    }

  }


  setGoalsid(id: string) {
    this.goalid = id;
  }


  loadGoals(userid: any) {
    this.api.getGoalsToUser(userid)
      .subscribe((res: any) => {
        this.goalsToOneUser = res;
        console.log('alle goals to user: ' + this.goalsToOneUser);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.idMember = userid;
  }

}
