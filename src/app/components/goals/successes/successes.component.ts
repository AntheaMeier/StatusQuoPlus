import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Goals } from 'src/app/models/goals';
import { Tasks } from 'src/app/models/tasks';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-successes',
  templateUrl: './successes.component.html',
  styleUrls: ['./successes.component.css']
})
export class SuccessesComponent implements OnInit {

  currentUrl = '';
  idloggedInUser: string = '';
  idMember: any;
  successes: Goals[] = [];
  selectedGoal: Goals = {_id: '', description: '', userid: '', expiry_date: new Date(), priority: false, completed: false};

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.idloggedInUser = this.auth.getUserDetails()._id;
    if (this.router.url == '/') {
      this.getSuccesses(this.idloggedInUser);
    } else {
      this.idMember = this.route.snapshot.paramMap.get('id');
      this.getSuccesses(this.idMember);
    }
  }

  getSuccesses(idloggedInUser: any) {
    this.api.getGoalsToUser(idloggedInUser, true).subscribe(
      (res) => {
        this.successes = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
