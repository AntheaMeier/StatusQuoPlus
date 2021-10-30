import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLogin = false;
  errorMessage: any;
  registerForm!: FormGroup;

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private router: Router


) { }

  get f(): any { return this.registerForm?.controls; }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.isUserLogin();
  }

  onSubmit(): void {
    this.submitted = true;
    console.log('Your form data : ', this.registerForm?.value);
    this.api.postTypeRequest('user/register', this.registerForm?.value).subscribe((res: any) => {
      if (res.status) {
        console.log(res);
        this.auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this.auth.setDataInLocalStorage('token', res.token);
        this.router.navigate(['home']);
      } else {
        console.log(res);
        alert(res.msg);
      }
    }, (err: { error: { message: any; }; }) => {
      this.errorMessage = err.error.message;
    });
  }

  isUserLogin(): void{
    if (this.auth.getUserDetails() != null){
      this.isLogin = true;
    }
  }
}
