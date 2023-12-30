import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [

  ]
})
export class LoginComponent implements OnInit {
hide: any;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  login(form: NgForm) {
    console.log(form.value);
    this.userService.login(form.value).subscribe(
      (res: any) => {
        // console.log(res.jwtToken);
        // console.log(res.user.role[0].roleName);

        this.userAuthService.setToken(res.jwtToken);
        this.userAuthService.setRoles(res.user.role[0].roleName);

        const roles = this.userAuthService.getRoles() as string[]; // Add type assertion

        console.log(roles);

        if (roles.includes("Admin")) {
          this.router.navigate(['/admin']);
        } else if (roles.includes("user")) {
          this.router.navigate(['/user']);
        } else {
          this.router.navigate(['/']);
        }

        // localStorage.setItem('jwtToken', res.token);
      },
      err => {
        console.log(err);
      }
    );
  }


}
