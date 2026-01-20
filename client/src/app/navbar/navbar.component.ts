import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgbCollapseModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuCollapsed: boolean = true;
}
