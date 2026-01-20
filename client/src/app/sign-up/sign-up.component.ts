import { Component } from '@angular/core';
import { AuthService, SignUpCredentials } from "../auth.service";
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  form: SignUpCredentials = { username: '', email: '', password: '' };
  errorMsg = '';

  constructor(protected authService: AuthService, protected router: Router) { }

  onSubmit(): void {
    this.errorMsg = '';
    this.authService.sign_up(this.form).subscribe({
      next: (res) => {
        console.log('SIGN UP OK:', res);
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.log('SIGN UP ERROR:', err);
        this.errorMsg = err?.error?.message ?? 'Neuspješna registracija.';
      }
    });
  }

  goToSignIn(): void {
    this.router.navigate(['/sign-in']);
  }
}
