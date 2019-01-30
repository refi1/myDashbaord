import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
    constructor(
      private fb: FormBuilder,
      private auth: UserService,

    ) { }

    ngOnInit() {
      this.signupForm = this.fb.group({
        'emer' : [null, Validators.required],
        'mbimer' : [null, Validators.required],
        'email' : [null, [Validators.required, Validators.email]],
        'password' : [null,[Validators.required,Validators.minLength(6)]],
        'gjinia' : [null, Validators.required],
        'shteti' : [null, Validators.required],
        'qyteti' : [null, Validators.required],
        'mosha' : [null, Validators.required],
      });

    }

     signup(formData: NgForm) {
       if (formData.value.emer==null || formData.value.mbimer==null||formData.value.email==null || formData.value.password==null
      || formData.value.gjinia==null || formData.value.shteti==null||formData.value.qyteti==null || formData.value.mosha==null){
         return ;
       } else{
      return this.auth.signUp(formData.value).subscribe(
        (user) => {
          console.log(`added user ${JSON.stringify(user)}`);

          console.log(formData);

        });
      }
   }

   // convenience getter for easy access to form fields
   get f() { return this.signupForm.controls; }

   onSubmit() {
       this.submitted = true;

       // stop here if form is invalid
       if (this.signupForm.invalid) {
           return;
       }

       // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signupForm.value))
   }
}
