import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, LoginRequest } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private REST_API_SERVER = 'http://localhost:3000';
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkStoredUser();
  }

  private checkStoredUser() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  // Đăng nhập đơn giản - tìm user trong database
  login(loginData: LoginRequest): Observable<User[]> {
    return this.http.get<User[]>(`${this.REST_API_SERVER}/users?username=${loginData.username}&password=${loginData.password}`)
      .pipe(
        tap(users => {
          if (users && users.length > 0) {
            const user = users[0];
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.isAuthenticatedSubject.next(true);
          }
        })
      );
  }

  // Đăng ký đơn giản - tạo user mới
  registerUser(userData: User): Observable<User> {
    return this.http.post<User>(`${this.REST_API_SERVER}/users`, userData);
  }

  // Đăng xuất
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  // Lấy current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Kiểm tra đã đăng nhập chưa
  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
