import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterForm} from "../models/register-form";
import {LoginForm, LoginResponse} from "../models/login-form";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl : string = "http://localhost:3000"
  private loginPath : string = "/login"
  private registerPath : string = "/register"

  public currentUser : Observable<LoginResponse | undefined>;
  private currentUserSubject : BehaviorSubject<LoginResponse | undefined>

  private userStorageKey: string = "currentUser"

  constructor(private http: HttpClient, private router: Router) {
    let userStorageValue = localStorage.getItem(this.userStorageKey) ?? sessionStorage.getItem(this.userStorageKey);
    this.currentUserSubject = new BehaviorSubject<LoginResponse | undefined>(JSON.parse(userStorageValue!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get token() {
    return this.currentUserSubject.value?.accessToken;
  }

  isLogged() {
    // Lors de l'évaluation d'une variable, elle peut être considérée comme étant 'falsy' sous certaines conditions
    // Afin de verifier qu'elle ne l'est pas, il me suffit de faire une double inversion (!!)
    return this.currentUser.pipe(map(currentUser => !!currentUser))
  }

  hasRole(role: string) {
    // À la différence du ! qui assure à notre programme qu'il peut poursuivre son exécution,
    // Le ? évalue la valeur avant de poursuivre, ceci évite des plantages dans les cas ou on traite avec des valeurs pouvant être falsy
    return this.currentUser.pipe(map(currentUser => currentUser?.user.role.includes(role)))
  }

  register(form: RegisterForm) {
    return this.http.post(`${this.apiUrl}${this.registerPath}`,form)
  }

  login(form: LoginForm) {
    return this.http.post<LoginResponse>(`${this.apiUrl}${this.loginPath}`,form)
      .pipe(tap(result => {
        if (result) {
          sessionStorage.setItem(this.userStorageKey, JSON.stringify(result))
          /* toujours avoir le consentement de l'utilisateur avant de stocker de façon permanente des informations sur son appareil
          if (form.rememberMe)
            localStorage.setItem(this.userStorageKey, JSON.stringify(result))*/
          this.currentUserSubject.next(result)
        } else {
          this.logout()
        }
      }))
  }

  logout() {
    sessionStorage.clear()
    localStorage.clear()
    this.currentUserSubject.next(undefined)
    this.router.navigate(['/login'])
  }
}
