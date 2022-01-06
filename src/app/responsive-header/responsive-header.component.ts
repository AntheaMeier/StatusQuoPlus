import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Login, Team} from "../shared/login";
import {ApiService} from "../services/api.service";
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
  roleLoggedInUser: String = "";
  selectedRole: String = "Mitarbeiter_in";
  idLoggedInUser: String = "";
  teamVorgesetze: Team[] = [];
  goalid: string = "";
  clickedOnMitarbeiter = false;
  idTeamMember = "";
  tasksToOneGoal: Tasks[] = [];
  tasksToTodo: Tasks[] = [];
  tasksToDoing: Tasks[] = [];
  tasksToDone: Tasks[] = [];
  goalsToOneUser: Goals[] = [];
  currentUrl: String = ''




  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private auth: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private api: ApiService,
  ) {
    this.loginForm = formBuilder.group({
      title: formBuilder.control('initial value', Validators.required)
    });


    if(window.location.href != 'http://localhost:4200/'){
      this.currentUrl = window.location.href;

    }

    else{
      this.currentUrl='';
    }

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

  get f(): any {
    return this.loginForm.controls;
  }

  isUserLogin(): void {
    if (this.auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

  logout(): void {
    this.auth.clearStorage();
    window.location.reload()
  }

  onSelectVorgesetzte_r() {
    this.selectedRole = "Vorgesetzte_r"
    this.tasksToOneGoal = [];
    this.clickedOnMitarbeiter= false;
  }


  changeRoleToMitarbeiter_in(){
    this.selectedRole ="Mitarbeiter_in";
    this.router.navigate(['/']);
    this.currentUrl= '';  }

  onClickVorgesetzter() {
    this.api.getUser(this.idLoggedInUser)
      .subscribe((res: Login) => {
        console.log('get user ' + res.firstname);
        this.teamVorgesetze = res.team;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  setGoalsid(id: string) {
    this.goalid = id;
  }

  loadGoals(userid: any) {
    this.tasksToOneGoal = [];
    this.tasksToTodo = [];
    console.log(this.tasksToTodo);
    this.clickedOnMitarbeiter = true;
    this.api.getGoalsToUser(userid)
      .subscribe((res: any) => {
        this.goalsToOneUser = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.idTeamMember = userid;
  }



  reloadPage() {
    this.router.navigate(['/']);
    this.currentUrl= '';

  }

  clickProtokoll() {
    this.currentUrl = window.location.href;
  }

  clickLogo() {
    console.log('Click Logo: ' + this.tasksToTodo);
  }
}
