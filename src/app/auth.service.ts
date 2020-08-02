import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _router:Router) { }

registerUser(user)
{
  return this.http.post("http://localhost:3000/api/register", user);
} 

loginUser(user)
{
  return this.http.post("http://localhost:3000/api/login", user);
} 

loggedIn()
{
  return !!localStorage.getItem('token');
}

logoutUser()
{
  localStorage.removeItem('token')
  this._router.navigate(['/products'])
}
getToken()
{
  return localStorage.getItem('token');
}

}