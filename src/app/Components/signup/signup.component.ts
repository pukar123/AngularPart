import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService,private router: Router) {

  }
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],

    })
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  OnSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      this.auth.signUp(this.signUpForm.value)
        .subscribe({
          next: (res) => {
            alert(res.message);
            this.signUpForm.reset();
            this.router.navigate(['login']);
          },
          error: (err) => {
            alert(err.message)
          }
        })
    }
    else {
      this.validateForm(this.signUpForm);
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
