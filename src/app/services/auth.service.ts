import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  token = signal<string | null>(localStorage.getItem('token'));
  user = signal<any>(null);

  constructor() {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      this.token.set(savedToken);
      this.loadUserProfile(savedToken);
    }
  }

  login(username: string, password: string): Observable<any> {
    const res = {
      access_token: "fake_token",
      user: { username }
    };

    this.token.set(res.access_token);
    this.user.set(res.user);
    localStorage.setItem('token', res.access_token);
    this.router.navigate(['/']);

    return of(res);  // <-- AGORA PODE SER MOCKADO
  }


  // login(username: string, password: string): Observable<any> {
  //   return this.http.post('http://localhost:5000/api/auth/login', { username, password }).pipe(
  //     tap((res: any) => {
  //       this.token.set(res.access_token);
  //       this.user.set(res.user);
  //       localStorage.setItem('token', res.access_token);
  //       this.router.navigate(['/']); 
  //     })
  //   );
  // }

  logout() {
    this.token.set(null);
    this.user.set(null);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {
    return !!this.token();
  }

  getCurrentUser() {
    return this.user();
  }

  getToken() {
    return this.token();
  }

  private loadUserProfile(token: string) {
    this.http.get('http://localhost:5000/api/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res: any) => this.user.set(res.user),
      error: () => this.logout(),
    });
  }
}
