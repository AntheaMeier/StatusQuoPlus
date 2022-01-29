import {Component, OnInit} from '@angular/core';
import {Goals} from "../shared/goals";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {Review} from "../shared/review";
import {AuthService} from "../services/auth.service";

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
  idMember : any = "";
  goalsToOneUser: Goals[] = [];
  selectedRole = "";
  currentMember = {userid: '', selectedRole: '', surname:'', firstname:''};
  selectedId : any = ''

  surname = ""
  firstname= ""

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private api: ApiService,
              private route: ActivatedRoute,
              private auth: AuthService,
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
    this.selectedRole = this.auth.getUserDetails().user_info.role;
    this.idMember = this.route.snapshot.paramMap.get('id') || '';

    console.log('Die idMember mit route snapshot ' + this.idMember);
    this.api.getUser(this.idMember).subscribe((res: any) => {
      this.currentMember = res;
      this.surname = this.currentMember.surname;
      this.firstname = this.currentMember.firstname;
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });


    this.loadGoals(this.idMember);
    this.loadReviews(this.idMember);

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
