import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "sign-in" },
    { path: "sign-in", component: SignInComponent },
    { path: "sign-up", component: SignUpComponent },
    { path: "profile", component: ProfileComponent },
    { path: "**", redirectTo: "sign-in" }
];
