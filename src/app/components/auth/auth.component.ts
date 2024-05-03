import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/interfaces/api-response';
import { LoginRequest } from 'src/app/interfaces/login-request';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  // Boolean flag to determine whether the user is in login or registration mode
  isLogin: boolean = true;

  // Boolean flag to indicate whether a user was not found during login
  userNotFound: boolean = false;

  // Input fields for user registration and login
  name: string = '';
  id: string = '';

  userForm = new FormGroup({
    id: new FormControl(''),
  });

  constructor(private userService: UserService, private router: Router) {
    // Check if the user is already logged in, and if so, redirect to the chat page
    if (localStorage.getItem('user') != null) {
      this.router.navigate(['chat']);
    }
  }

  // Toggle between login and registration modes
  toggleAuth(): void {
    this.isLogin = !this.isLogin;
    // this.userNotFound = false;
  }

  // Handle user login
  // onUserLogin(): void {
  //   let body: LoginRequest = {
  //     id: this.id,
  //   };
  //   // Call the userLogin method from the UserService and handle the response
  //   this.userService.userLogin(body.id).subscribe((res: User) => {
  //     if (res != null) {
  //       // User is successfully logged in; store user data in local storage and navigate to the chat page
  //       localStorage.setItem('user', JSON.stringify(res));
  //       this.router.navigate(['chat']);
  //     }
  //     //  else {
  //     //   // User not found; set the 'userNotFound' flag to display an error message
  //     //   this.userNotFound = true;
  //     // }
  //   });
  // }
  // onUserLogin() {
  //   debugger
  //    //   let body: LoginRequest = {
  // //     id: this.id,
  // //   };
  //   this.userService.userLogin("7396861143760960").subscribe({
  //     next: (res: any) => {
  //       debugger
  //       localStorage.setItem('user', JSON.stringify(res));
  //       // this.router.navigate(['chat']);
  //     }, error: (err: any) => {
  //       console.log(err)
  //     }
  //   })
  // }

  onUserLogin() {
    //   let body: LoginRequest = {
    //     id: this.id,
    //   };
    const id = this.userForm.value.id;
    console.log(id);

    this.userService.userLogin2(this.userForm.value.id).subscribe({
      next: (res: any) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['chat']);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // Handle user registration
  // onUserRegister(): void {
  //   let body: User = {
  //     userId: "",
  //     firstName: this.firstName,
  //     lastName: this.lastName,
  //     email: this.email,
  //   };
  // Call the userRegister method from the UserService and handle the response
  //   this.userService.userRegister(body).subscribe((res: ApiResponse) => {
  //     if (res.data != null) {
  //       // User is successfully registered; store user data in local storage and navigate to the chat page
  //       localStorage.setItem('user', JSON.stringify(res.data));
  //       this.router.navigate(['chat']);
  //     } else {
  //       // Registration failed
  //       console.log(res);
  //     }
  //   });
  // }
}
