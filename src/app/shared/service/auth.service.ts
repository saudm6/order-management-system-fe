import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
  UserData,
} from '../../feature/user/models/index';
import { jwtDecode, type JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected httpClient = inject(HttpClient);
  protected apiAuthUrl = `http://localhost:5210/api/account`;

  registerUser(request: RegisterUserRequest): Observable<UserData> {
    return this.httpClient.post<UserData>(`${this.apiAuthUrl}/register`, request).pipe(
      map((response) => {
        const userData: UserData = {
          id: response.id,
          fullName: response.fullName,
          email: response.email,
          createdAt: response.createdAt,
        };
        return userData;
      }),
    );
  }

  loginUser(request: LoginUserRequest): Observable<LoginUserResponse> {
    return this.httpClient.post<LoginUserResponse>(`${this.apiAuthUrl}/login`, request);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  IsLoggedIn(): boolean {
    const token = this.getToken();

    if (!token){
      return false;
    }

    try{
      const decodedToken = jwtDecode<JwtPayload>(token);
      return typeof decodedToken.exp === 'number' && decodedToken.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}
