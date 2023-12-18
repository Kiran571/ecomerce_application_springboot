import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserAuthService } from "../_services/user-auth.service";
import { error } from "console";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { throwError} from "rxjs";

export class AuthInterceptor implements HttpInterceptor{
    
    constructor(
        private userAuthService: UserAuthService,
        private router: Router
    ){}
    
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
        ): Observable<HttpEvent<any>> {
            if(req.headers.get('No-Auth') == "True"){
                return next.handle(req.clone());
            }

            const token = this.userAuthService.getToken();

            req = this.addToken(req, token);

            return next.handle(req).pipe(
                catchError(
                    (error: HttpErrorResponse) => {
                        console.log(error.status);

                        if(error.status === 401){
                            this.router.navigateByUrl('/login');
                        }else if(error.status === 403){
                            this.router.navigateByUrl('/forbidden');
                        }
                        return throwError("some thing went wrong");
        
                        
                }
                )
            );

    }
    
    private addToken(req: HttpRequest<any>, token: string){

        return req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });

    }


}