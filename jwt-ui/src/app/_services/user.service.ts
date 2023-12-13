import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  ) { }

  public login(user: any) {
    return this.http.post<any>(this.PATH_OF_API + "/authenticate", user, {headers: this.requestHeader});
  }
}
