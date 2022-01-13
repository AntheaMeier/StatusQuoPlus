import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Review} from "../shared/review";
import {ApiService} from "../services/api.service";
import {Goals} from "../shared/goals";
import {Tasks} from "../shared/tasks";

@Component({
  selector: 'app-board-member',
  templateUrl: './board-member.component.html',
  styleUrls: ['./board-member.component.css']
})
export class BoardMemberComponent implements OnInit {

  selectedId: any = "" ;
  reviewsToOneUser: Review[] = [];
  goalsToOneUser: Goals[] = [];
  selectedRole = "Vorgesetzte_r"

  tasksToOneGoal: Tasks[] = [];
  tasksToTodo: Tasks[] = [];
  tasksToDoing: Tasks[] = [];
  tasksToDone: Tasks[] = [];
   goalid: string = '';




  constructor(private route: ActivatedRoute, private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.selectedId = this.route.snapshot.paramMap.get('id');
    this.loadReviews(this.selectedId);
    this.loadGoals(this.selectedId);


  }


  loadReviews(userid: string) {
    this.api.getReviewsToUser(userid)
      .subscribe((res: any) => {
        this.reviewsToOneUser = res;
      }, err => {
        console.log(err);
      });


  }

  loadGoals(userid: string) {
    this.api.getGoalsToUser(userid)
      .subscribe((res: any) => {
        this.goalsToOneUser = res;
      }, err => {
        console.log(err);
      });


  }

  setGoalsid(id: string) {
    this.goalid = id;
  }

}
