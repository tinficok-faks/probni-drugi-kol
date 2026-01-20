import { Component } from '@angular/core';

import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-in',
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  constructor(protected authService: AuthService, protected router: Router) {}

}
