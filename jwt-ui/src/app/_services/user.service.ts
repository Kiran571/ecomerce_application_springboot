import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import e from 'express';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = 'http://localhost:9090';

  requestHeader = new HttpHeaders({
    "No-Auth": "True"
  })

  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService,
  ) { }

  public login(user: any) {
    return this.http.post<any>(this.PATH_OF_API + "/authenticate", user, {headers: this.requestHeader});
  }

  public forUser(){
    return this.http.get(this.PATH_OF_API + "/forUser", {
      responseType: 'text'
    });
  }

  public forAdmin(){
    return this.http.get(this.PATH_OF_API + "/forAdmin", {
      responseType: 'text'
    });
  }


  public roleMatch(allowedRoles: any): boolean {
    var isMatch = false;
    const roles = this.userAuthService.getRoles() as string[]; // Add type assertion
    roles.includes(allowedRoles) ? isMatch = true : isMatch = false;
    
    return isMatch;
  }

}
