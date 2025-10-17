import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  username = '';
  password = '';
  email = '';
  fullName = '';
  message = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    const userData = {
      username: this.username,
      password: this.password,
      email: this.email,
      fullName: this.fullName
    };

    this.userService.registerUser(userData).subscribe({
      next: () => {
        this.message = 'Đăng ký thành công!';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => this.message = 'Đăng ký thất bại!'
    });
  }
}
