import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { Credentials } from "../../../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.scss'
})
export class LoginAdminComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: Credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/admin/dashboard');
          console.log('dang nhap thanh cong');
        },
        err => {
          console.error(err);
        }
      );
    }
  }
}
