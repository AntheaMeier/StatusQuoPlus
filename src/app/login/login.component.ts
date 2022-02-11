import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginData } from '../shared/loginData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogin = false;
  loginForm: FormGroup;
  submitted = false;
  data: LoginData[] = [];
  isLoadingResults = true;
  notloggedIn = true;
  loginInvalid = false;


  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      title: formBuilder.control('initial value', Validators.required),
    });
  }

  ngOnInit(): void {
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
  }

  get f(): any {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.loginInvalid = false;
    this.submitted = true;
    for (let i of this.data) {
      if (
        i.username === this.loginForm.get('username')?.value &&
        i.password === this.loginForm.get('password')?.value
      ) {
        this.notloggedIn = false;
        // todo: if you subscribe an observable that comes from backend you MUST unsubscribe it as well. Otherwise your browser will be crashed.
        // see here: https://blog.bitsrc.io/6-ways-to-unsubscribe-from-observables-in-angular-ab912819a78f
        // really.. it's important, you will get crazy otherwise :D
        this.api
          .postTypeRequest('', this.loginForm.value)
          .subscribe((res: any) => {
            // you coud put this logic into a guard as well that is listening to loginData observable
            this.router.navigate(['']);
          });
      }


      }
    if(this.notloggedIn){
      this.loginInvalid = true;}

    }



  isUserLogin(): void {
    if (this.auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

  removeErrorMessage(): void {
    this.loginInvalid = false;
  }
}
