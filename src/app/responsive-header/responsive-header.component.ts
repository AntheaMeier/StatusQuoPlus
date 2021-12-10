import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Login, Team} from "../shared/login";
import {ApiService} from "../shared/api.service";
import {Tasks} from "../shared/tasks";
import {Goals} from "../shared/goals";

@Component({
  selector: 'app-responsive-header',
  templateUrl: './responsive-header.component.html',
  styleUrls: ['./responsive-header.component.css']
})
export class ResponsiveHeaderComponent {
  public loggedIn = false;
  isLogin = false;
  loginForm: FormGroup
  submitted = false;
  data: Login[] = [];
  isLoadingResults = true;
  firstNameloggedInUser: String = "";
  lastNameloggedInUser: String = "";
  roleLoggedInUser: String= "";
  selectedRole: String = "Mitarbeiter_in";
  idLoggedInUser: String = "";
 teamVorgesetze: Team[] = [];
  loginInvalid = false;
  userFound = false;
  goalid : string = "";
  clickedOnMitarbeiter = false;
  idTeamMember = "";


  tasksToOneGoal : Tasks[] = [];


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
   goalsToOneUser: Goals[] = [];

  constructor(private breakpointObserver: BreakpointObserver,
              private auth: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private api: ApiService,
  ) {
    this.loginForm = formBuilder.group({
      title: formBuilder.control('initial value', Validators.required)
    });
  }

  setLoggedIn(data: boolean) {
    this.loggedIn = data;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.isUserLogin();
    this.api.getUsers()
      .subscribe((res: any) => {
        this.data = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.firstNameloggedInUser = this.auth.getUserDetails().user_info.firstname;
    this.lastNameloggedInUser = this.auth.getUserDetails().user_info.surname;



    this.roleLoggedInUser = this.auth.getUserDetails().user_info.role;
    this.idLoggedInUser = this.auth.getUserDetails().user_info._id;




    this.roleLoggedInUser = this.auth.getUserDetails().user_info.role;

  }

  get f(): any { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    for (let i of this.data) {
      if (i.username === this.loginForm.get('username')?.value && i.password === this.loginForm.get('password')?.value) {
        this.userFound= true;
        this.api.postTypeRequest('', this.loginForm.value).subscribe((res: any) => {
          this.auth.setDataInLocalStorage('userData', JSON.stringify(res));
          this.auth.setDataInLocalStorage('token', res.access_token);
          window.location.reload();
        });
      }
    }
    if(!this.userFound){
      this.loginInvalid= true;
    }
  }

  isUserLogin(): void{
    if (this.auth.getUserDetails() != null){
      this.isLogin = true;
    }
  }

  logout(): void{
    this.auth.clearStorage();
    window.location.reload()
  }

  removeErrorMessage(): void{
    this.loginInvalid=false;
  }


  onSelectVorgesetzte_r(){
    this.selectedRole = "Vorgesetzte_r"
  }


onSelectMitarbeiter_in(){
    this.selectedRole= "Mitarbeiter_in"
}


onClickVorgesetzter(){
  this.api.getUser(this.idLoggedInUser)
    .subscribe((res: Login) => {
      console.log('get user '+ res.firstname);

     this.teamVorgesetze =  res.team;



      this.isLoadingResults = false;

    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
}


  setGoalsid(id: string) {
    this.goalid = id;
  }


  /// login ab hier


  loadGoals(userid:any) {

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

}
