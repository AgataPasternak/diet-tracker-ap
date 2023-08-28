import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly API_AUTH = environment.apiUrl + 'auth/';
  httpClient = inject(HttpClient);



}