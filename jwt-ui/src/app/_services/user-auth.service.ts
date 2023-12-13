import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles() :[]{
    return JSON.parse(localStorage.getItem('roles')!);
  }

  public setToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  public getToken() :string{
    return localStorage.getItem('jwtToken')!;
  }

  public clear(){
    localStorage.clear();
  }


  public isLoggeedIn() :boolean{
    return this.getToken() != null;
  }

}
