import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type SignInCredentials = { email: string, password: string };
export type SignUpCredentials = { email: string, password: string, username: string };
export type Payload = { email: string, username: string };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(protected http: HttpClient) { }
  
}
