export interface User {
  id?: string;
  username: string;
  password: string;
  email: string;
  fullName: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
