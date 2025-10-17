import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.login({ username: this.username, password: this.password }).subscribe({
      next: (users) => {
        if (users && users.length > 0) {
          this.router.navigate(['/stocks']);
        } else {
          this.errorMessage = 'Sai tên đăng nhập hoặc mật khẩu!';
        }
      },
      error: () => this.errorMessage = 'Sai tên đăng nhập hoặc mật khẩu!'
    });
  }
}
