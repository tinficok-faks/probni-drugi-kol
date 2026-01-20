import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "sign-in" },
    { path: "sign-in", component: SignInComponent, canActivate: [guestGuard] },
    { path: "sign-up", component: SignUpComponent, canActivate: [guestGuard] },
    { path: "profile", component: ProfileComponent, canActivate: [authGuard] },
    { path: "**", redirectTo: "sign-in" }
];
