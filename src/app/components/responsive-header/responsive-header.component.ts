import { ChangeDetectorRef, Component, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginData, Team } from '../../models/loginData';
import { ApiService } from '../../services/api.service';
import { Tasks } from '../../models/tasks';

@Component({
  selector: 'app-responsive-header',
  templateUrl: './responsive-header.component.html',
  styleUrls: ['./responsive-header.component.css'],
})
export class ResponsiveHeaderComponent {
  loginData$: Observable<LoginData | undefined> = this.api.loginData$;
  public loggedIn = false;
  isLogin = false;
  loginForm: FormGroup;
  submitted = false;
  data: LoginData[] = [];
  isLoadingResults = true;
  firstNameloggedInUser: String = '';
  lastNameloggedInUser: String = '';
  roleLoggedInUser: String = '';
  selectedRole: String = 'Mitarbeiter_in';
  idLoggedInUser: String = '';
  teamVorgesetze: Team[] = [];
  goalid: string = '';
  @Output() idTeamMember = '';
  tasksToOneGoal: Tasks[] = [];
  tasksToTodo: Tasks[] = [];
  currentUrl: String = '';
  panelOpenState = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = formBuilder.group({
      title: formBuilder.control('initial value', Validators.required),
    });
    if (window.location.href != 'http://localhost:4200/') {
      this.currentUrl = window.location.href;
    } else {
      this.currentUrl = '';
    }
  }

  setLoggedIn(data: boolean) {
    this.loggedIn = data;
  }

  goToTeamview(
    userid: any,
    selectedRole: any,
    surname: any,
    firstname: any
  ): void {
    this.router.navigate(['/teamview/' + userid], {
      state: { data: { userid, selectedRole, surname, firstname } },
    });
  }

  goToGoals(userid: any, selectedRole: any): void {
    this.router.navigate([''], { state: { data: { userid, selectedRole } } });
  }

  ngOnInit(): void {
    console.log('url ' + this.router.url);
    this.currentUrl = this.router.url;

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.isUserLogin();
    this.api.getUsers().subscribe(
      (res: any) => {
        this.data = res;
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );

    this.firstNameloggedInUser = this.auth.getUserDetails().firstname;
    this.lastNameloggedInUser = this.auth.getUserDetails().surname;
    this.roleLoggedInUser = this.auth.getUserDetails().role;
    this.idLoggedInUser = this.auth.getUserDetails()._id;
    this.roleLoggedInUser = this.auth.getUserDetails().role;

    this.api.getUser(this.idLoggedInUser).subscribe(
      (res: LoginData) => {
        console.log('get user ' + res.firstname);
        this.teamVorgesetze = res.team;
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
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
    window.location.reload();
  }

  onSelectVorgesetzte_r() {
    this.selectedRole = 'Vorgesetzte_r';
    this.tasksToOneGoal = [];
  }

  changeRoleToMitarbeiter_in() {
    console.log('geklickt');
    this.selectedRole = 'Mitarbeiter_in';
    this.currentUrl = '';
    this.router.navigate(['/']);
  }

  onClickVorgesetzter() {
    this.api.getUser(this.idLoggedInUser).subscribe(
      (res: LoginData) => {
        console.log('get user ' + res.firstname);
        this.teamVorgesetze = res.team;
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  setGoalsid(id: string) {
    this.goalid = id;
  }

  clickProtokoll() {
    this.currentUrl = window.location.href;
  }

  changeUrl(id: String) {
    this.currentUrl = 'teamview';
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['teamview/', id]));
  }

  deleteSelectedGoalFromLocalStorage() {
    localStorage.removeItem('selectedGoal');
  }
}
