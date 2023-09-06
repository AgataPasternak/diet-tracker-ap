import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignInUser, User } from './auth.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly API_FOODS = environment.apiUrl + 'auth/';
  httpClient = inject(HttpClient);

  signUp(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_FOODS + 'signup', user);
  }

  singIn(user: SignInUser) {
    return this.httpClient.post<SignInUser>(this.API_FOODS + 'signin', user);
  }

  signOut() {
    localStorage.removeItem('token');
  }
  


}
