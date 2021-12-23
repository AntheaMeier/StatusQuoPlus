import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {Login} from "../shared/login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin = false;
  loginForm: FormGroup
  submitted = false;
  data: Login[] = [];
  isLoadingResults = true;
  loginInvalid = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      title: formBuilder.control('initial value', Validators.required)
    });
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
  }

  get f(): any { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    for (let i of this.data) {
      if (i.username === this.loginForm.get('username')?.value && i.password === this.loginForm.get('password')?.value) {
        this.api.postTypeRequest('', this.loginForm.value).subscribe((res: any) => {
          this.auth.setDataInLocalStorage('userData', JSON.stringify(res));
          this.auth.setDataInLocalStorage('token', res.access_token);
          this.router.navigate([''])
          window.location.reload();
        });
      }
    }
  }

  isUserLogin(): void{
    if (this.auth.getUserDetails() != null){
      this.isLogin = true;
    }
  }

  logout(): void{
    this.auth.clearStorage();
    this.router.navigate(['/login']);
  }

  removeErrorMessage(): void{
    this.loginInvalid=false;
  }
}
