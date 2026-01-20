import { Component, OnInit } from '@angular/core';
import { AuthService, Payload } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  payload: Payload | null = null;

  constructor(protected authService: AuthService, protected router: Router) { }

  ngOnInit(): void {
    this.payload = this.authService.token_payload();
    if (!this.payload) {
      this.router.navigate(['/sign-in']);
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/sign-in']);
  }
}
