import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
    this.router.navigate(['/home']);
  }

  public roleMatch(allowedRoles: any): boolean {
    return this.userService.roleMatch(allowedRoles);
  }

}
