export interface UserCreateDto {
  fullName: string;
  email: string;
  role: string;
}

export interface UserLoginDto {
  email: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}
