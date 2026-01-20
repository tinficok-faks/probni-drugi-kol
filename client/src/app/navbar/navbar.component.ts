import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService, Payload } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgbCollapseModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuCollapsed: boolean = true;

  constructor(protected authService: AuthService) { }

  get payload(): Payload | null {
    return this.authService.token_payload();
  }

  get username(): string | null {
    return this.payload?.username ?? null;
  }
}
