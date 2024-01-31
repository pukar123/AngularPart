import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,private auth:AuthService,private router:Router) {

  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]

    })
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  OnSubmit() {
    if (this.loginForm.valid) {
this.auth.login(this.loginForm.value)
.subscribe({
next:(res)=>{
  alert(res.message);
  this.loginForm.reset();
  this.auth.storeToken(res.AccessToken);
  this.router.navigate(['dashboard']);
},
error:(err)=>{
  alert(err.message)
}
})
    }
    else {
      this.validateForm(this.loginForm);
      alert("Your form is invalid");
    }
  }
  private validateForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {

      } else if (control instanceof FormGroup) {
        this.validateForm(control);
      }
    })
  }
}
