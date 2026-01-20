import { Component } from '@angular/core';

import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-up',
  imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  constructor(protected authService: AuthService, protected router: Router) {}
  
}
