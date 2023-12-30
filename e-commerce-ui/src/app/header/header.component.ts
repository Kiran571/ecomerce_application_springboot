import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  public loggedIn(): boolean {
    return this.userAuthService.loggedIn();
  }

  public logout(): void {
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }

  public roleMatch(allowedRoles: any): boolean {
    return this.userService.roleMatch(allowedRoles);
  }

  public isAdmin() {
    return this.userAuthService.isAdmin();
  }

  public isUser() {
    return this.userAuthService.isUser();
  }

}
