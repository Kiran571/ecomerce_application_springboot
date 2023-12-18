import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { response } from 'express';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  message!: string;

   constructor(
    private userService: UserService
   ) { }

   ngOnInit(): void {
    this.forUser();
   }  

   forUser(){
    this.userService.forUser().subscribe(
      (response) => {
        console.log(response);
        this.message = response;
      },
      (error) => {
        console.log(error);
      }
    );
   }


}
