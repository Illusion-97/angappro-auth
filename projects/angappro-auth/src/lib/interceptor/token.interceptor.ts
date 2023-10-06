import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private apiUrl= "http://localhost:3000"

  constructor(private service: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("in interceptor")
    const token = this.service.token;
    if(token && request.url.startsWith(this.apiUrl)) {
      request = request.clone({
        // setHeaders ajoute un header à ceux déjà présent != headers les remplace
        setHeaders: {
          Authorization : `Bearer ${token}`
        }
      })
    }
    return next.handle(request);
  }
}
