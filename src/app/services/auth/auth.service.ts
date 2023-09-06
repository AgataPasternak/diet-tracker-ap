import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignInUser, User } from './auth.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly API_AUTH = environment.apiUrl + 'auth/';
  httpClient = inject(HttpClient);

  signUp(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_AUTH + 'signup', user);
  }

  singIn(user: SignInUser) {
    return this.httpClient.post<SignInUser>(this.API_AUTH + 'signin', user);
  }

  signOut() {
    return this.httpClient.post<SignInUser>(this.API_AUTH + 'signin', null);
  }
  


}
