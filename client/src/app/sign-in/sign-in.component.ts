import { Component } from '@angular/core';
import { AuthService, SignInCredentials } from "../auth.service";
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  form: SignInCredentials = { email: '', password: '' };
  errorMsg = '';

  constructor(protected authService: AuthService, protected router: Router) { }

  onSubmit(): void {
    this.errorMsg = '';
    this.authService.sign_in(this.form).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.log('SIGN IN ERROR:', err);
        this.errorMsg = err?.error?.message ?? 'Neuspješna prijava.';
      }
    });
  }

  goToSignUp(): void {
    this.router.navigate(['/sign-up']);
  }
}
