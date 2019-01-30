import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

isLoading = false;
  loginForm: FormGroup;
  returnUrl: string;
  submitted = false;
   constructor(
  private fb: FormBuilder,
    private auth: UserService,

  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email' : [null, [Validators.required, Validators.email]],
      'password' : [null,[Validators.required,Validators.minLength(6)]],
    });



  }

  onLogin(formData: NgForm) {
    if (formData.value.email==null || formData.value.password==null){
      return ;
    } else{
      return this.auth.login(formData.value.email,formData.value.password);
    }

}

  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

  }

}
