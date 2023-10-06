import {User} from "./user";

export interface LoginForm {
  email: string
  password: string
}

export interface LoginResponse {
  user : User
  accessToken : string
}
