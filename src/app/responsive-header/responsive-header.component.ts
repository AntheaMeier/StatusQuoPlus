import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Login} from "../shared/login";
import {ApiService} from "../shared/api.service";

import { OnInit } from '@angular/core';

@Component({
  selector: 'app-responsive-header',
  templateUrl: './responsive-header.component.html',
  styleUrls: ['./responsive-header.component.css']
})
export class ResponsiveHeaderComponent {
  public loggedOut = false;
  public loggedIn = false;


  isLogin = false;
  errorMessage: any;
  loginForm: FormGroup
  submitted = false;
  data: Login[] = [];
  isLoadingResults = true;
  firstNameloggedInUser: String = "";
  lastNameloggedInUser: String = "";
  roleLoggedInUser: String= "";


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



  }

  // convenience getter for easy access to form fields
  get f(): any { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    console.log('Your form data : ', this.loginForm.value);
    for (let i of this.data) {
      if (i.username === this.loginForm.get('username')?.value && i.password === this.loginForm.get('password')?.value) {
        this.api.postTypeRequest('', this.loginForm.value).subscribe((res: any) => {
          console.log('der access token' + res.access_token);

          this.auth.setDataInLocalStorage('userData', JSON.stringify(res));
          this.auth.setDataInLocalStorage('token', res.access_token);
          window.location.reload()
        });
      }
    }

  }

  isUserLogin(): void{
    console.log('userDetails=' + this.auth.getUserDetails());
    if (this.auth.getUserDetails() != null){
      this.isLogin = true;
    }
  }

  logout(): void{
    this.auth.clearStorage();
    window.location.reload()
  }






  /// login ab hier



}
