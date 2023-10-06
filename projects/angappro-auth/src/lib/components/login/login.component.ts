import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading: boolean = false;
  form: FormGroup = new FormGroup<any>({
    email: new FormControl<string>("", {nonNullable: true, validators: [Validators.minLength(1)]}),
    password: new FormControl<string>("", {nonNullable: true, validators: [Validators.required]})
  })

  constructor(private authService: AuthService, private router: Router) {

  }


  handleLogin() {
    this.form.markAllAsTouched()
    if (this.form.valid) {
      this.loading = true
      this.authService.login(this.form.value)
        .pipe(
          finalize(() => {
            this.loading = false
          })
        ).subscribe({
        next: () => {
          this.router.navigate(['/']).catch()
        }
      })
    }
  }

  isInvalid(control: string) {
    const c = this.form.get(control);
    return c ? c.touched && c.invalid : true;
  }
}
