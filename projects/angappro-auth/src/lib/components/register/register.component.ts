import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {RegisterForm} from "../../models/register-form";
import {MustMatch} from "../../validators/validators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loading: boolean = false;
  err: any = undefined;
  passwordControl: FormControl<string> = new FormControl<string>("", {
    nonNullable: true,
    validators: [Validators.required]
  });
  confirmPasswordControl: FormControl<string> = new FormControl<string>("", {
    nonNullable: true,
    validators: [Validators.required, MustMatch(this.passwordControl)]
  });

  form: FormGroup = new FormGroup<any>({
    firstName: new FormControl<string>("", {nonNullable: true, validators: [Validators.required]}),
    lastName: new FormControl<string>("", {nonNullable: true, validators: [Validators.required]}),
    email: new FormControl<string>("", {nonNullable: true, validators: [Validators.required, Validators.email]}),
    password: this.passwordControl
  });

  constructor(private authService: AuthService, private router: Router) {
  }

  handleSubmit() {
    if (this.confirmPasswordControl.valid && this.form.valid) {
      this.authService.register(this.form.value).subscribe({
        next: () => {
          this.goLogin()
        },
        error: err => {
          this.err = err;
        }
      })
    }
  }

  isInvalid(control: string) {
    const c = control === 'confirmPassword' ? this.confirmPasswordControl : this.form.get(control);
    return c ? !c.pristine && c.invalid : true
  }

  goLogin() {
    this.router.navigate(['/login']).catch()
  }


}
