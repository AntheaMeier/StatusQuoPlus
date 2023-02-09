import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Review } from '../../models/review';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginData } from '../../models/loginData';
import { AuthService } from '../../services/auth.service';
import * as moment from 'moment';
import { DateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup } from '@angular/forms'; //character limitation

@Component({
  selector: 'app-annual-review',
  templateUrl: './annual-review.component.html',
  styleUrls: ['./annual-review.component.css'],
})
export class AnnualReviewComponent implements OnInit {
  review!: Review;
  addPost = false;
  enteredContent = '';
  enteredDate!: string;
  isLoadingResults = true;
  currentUrl = '';
  idloggedInUser: String = '';
  dataUsers: LoginData[] = [];

  @Input() reviewsToOneUser: Review[] = [];
  @Input() idTeam = '';
  @Input() idTeamMember: any = '';
  @Input() selectedRole: String = '';

  //character limitation
  myForm!: FormGroup;
  maxChars = 500;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>,
    //character limitation
    private fb: FormBuilder)
  {
    this.currentUrl = router.url;
    this.dateAdapter.setLocale('de');
    //character limitation
    this.buildForm();
  }

  //character limitation
  buildForm() {
    this.myForm = this.fb.group({
      wordLimitation: [""]
    });
  }

  ngOnInit() {
    this.currentUrl = this.router.url;
    if (this.currentUrl != '/protokolle') {
      this.selectedRole = 'Vorgesetzte_r';
    }
    this.api.getUsers().subscribe(
      (res: any) => {
        this.dataUsers = res;
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
    this.idloggedInUser = this.auth.getUserDetails()._id;
  }

  reloadCurrentRoute() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.currentUrl]);
    });
  }

  onAddPost(id: any) {
    if (this.selectedRole == 'Vorgesetzte_r') {
      id = this.idTeamMember;
    }
    this.currentUrl = this.router.url;
    this.isLoadingResults = true;
    const simpleObject = {} as Review;
    let date = moment(this.enteredDate).format('DD.MM.yyyy');
    simpleObject.date = date;
    simpleObject.description = this.enteredContent;
    simpleObject.userid = id;
    this.api.addReview(simpleObject).subscribe(
      (res: any) => {
        this.isLoadingResults = false;
      },
      (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
    this.addPost = false;
    window.location.reload();
  }

  addPostForm() {
    this.addPost = !this.addPost;
  }

  onBack() {
    this.addPost = !this.addPost;
  }
}
