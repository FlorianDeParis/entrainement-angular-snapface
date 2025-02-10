import { HttpEvent, HttpHandler, HttpHandlerFn, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor{

//   constructor(private auth: AuthService){}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     const headers = new HttpHeaders()
//       .append('Authorization', `Beared ${this.auth.getToken()}`);

//     const modifiedReq = req.clone({ headers });

//     return next.handle(modifiedReq);
//   }
// }

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const headers = new HttpHeaders()
  //         .append('Authorization', `Beared ${this.auth.getToken()}`);

  //       const modifiedReq = req.clone({ headers });

  //       return next.handle(modifiedReq);
  // }
  const auth = inject(AuthService);
  const headers = new HttpHeaders({
    Authorization: `Beared ${auth.getToken()}`
  })
  const newReq = req.clone({
    headers
  });
  return next(newReq)
}
