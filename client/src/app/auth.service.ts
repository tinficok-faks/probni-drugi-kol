import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export type SignInCredentials = { email: string, password: string };
export type SignUpCredentials = { email: string, password: string, username: string };

// payload iz JWT-a (u zadatku: username + email)
export type Payload = { email: string, username: string, iat?: number, exp?: number };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'jwt_token';

  constructor(protected http: HttpClient) { }

  // 1) spremi token
  save_token(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // 2) dohvati token
  get_token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // 3) obriši token
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // 4) payload iz tokena (ako token postoji)
  token_payload(): Payload | null {
    const token = this.get_token();
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    try {
      // base64url -> base64
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(json) as Payload;
    } catch {
      return null;
    }
  }

  // 5) sign-in: POST /api/sign-in + pohrani token
  sign_in(credentials: SignInCredentials): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`/api/sign-in`, credentials).pipe(
      tap(res => this.save_token(res.token))
    );
  }

  // 6) sign-up: POST /api/sign-up + pohrani token
  sign_up(credentials: SignUpCredentials): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`/api/sign-up`, credentials).pipe(
      tap(res => this.save_token(res.token))
    );
  }
}
