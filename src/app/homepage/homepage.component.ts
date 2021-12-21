import { Component, OnInit } from '@angular/core';
import {Tasks} from "../shared/tasks";
import {Team} from "../shared/login";
import {Goals} from "../shared/goals";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor( private api: ApiService) { }

  ngOnInit(): void {
  }

  isLogin = false;
  tasksToOneGoal : Tasks[] = [];
  selectedRole: String = "Mitarbeiter_in";
  teamVorgesetze: Team[] = [];
  goalid : string = "";
  clickedOnMitarbeiter = false;
  idTeamMember = "";
  goalsToOneUser: Goals[] = [];
  isLoadingResults = true;

  loadGoals(userid:any) {
    this.tasksToOneGoal= [];
    this.clickedOnMitarbeiter = true;
    this.api.getGoalsToUser(userid)
      .subscribe((res: any) => {
        this.goalsToOneUser = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.idTeamMember= userid;
  }

  setGoalsid(id: string) {
    this.goalid = id;
  }
}
