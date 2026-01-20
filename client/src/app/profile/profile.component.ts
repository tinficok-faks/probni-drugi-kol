import { Component } from '@angular/core';

import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  
  constructor(protected authService: AuthService, protected router: Router) {}

}
