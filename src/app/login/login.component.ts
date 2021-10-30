import {Component, NgModule, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  isLogin = false;
  errorMessage: any;
  loginForm!: FormGroup
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.isUserLogin();
  }

  get f(): any { return this.loginForm?.controls; }

  onSubmit(): void {
    this.submitted = true;
    console.log('Your form data : ', this.loginForm?.value);
    this.api.postTypeRequest('user/login', this.loginForm?.value).subscribe((res: any) => {
      if (res.status) {
        console.log(res);
        this.auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this.auth.setDataInLocalStorage('token', res.token);
        this.router.navigate(['read-task']);
      } else {
      }
    }, (err: { error: { message: any; }; }) => {
      this.errorMessage = err.error.message;
    });
  }

  isUserLogin(): void{
    console.log(this.auth.getUserDetails());
    if (this.auth.getUserDetails() != null){
      this.isLogin = true;
    }
  }

  logout(): void{
    this.auth.clearStorage();
    this.router.navigate(['home']);
  }
}
