import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] ,
})

export class LoginComponent {
  loginForm: FormGroup;
  revealPassword = false;

  constructor(private fb: FormBuilder, private AuthService: AuthService) {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.AuthService.login(this.loginForm.value).subscribe();
    }
  }
}
