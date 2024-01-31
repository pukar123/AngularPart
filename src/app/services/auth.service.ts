import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7123/api/v1/authenticate/"
  constructor(private http: HttpClient, private router:Router) { }

  signUp(request: any) {
    return this.http.post<any>(`${this.baseUrl}Register`, request)
  }
  login(request: any) {
    return this.http.post<any>(`${this.baseUrl}login`, request)
  }
  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue)
  }
  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }
}
