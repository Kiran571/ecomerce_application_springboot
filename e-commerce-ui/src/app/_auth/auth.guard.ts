import { 
  CanActivateFn, 
  Router, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot,
  UrlTree} 
  from '@angular/router';
import { Inject, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

export const authGuard: CanActivateFn = ( 
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot) : 
    Observable<boolean | 
    UrlTree> | 
    Promise<boolean | 
    UrlTree> | 
    boolean | 
    UrlTree =>
  {
    const userAuthService = inject(UserAuthService);
    const router = inject(Router);
    const  userService = inject(UserService);
    try{
    if(userAuthService.getToken()!==null){
      const role = route.data["roles"] as Array<string>;

      if(role){
        const match = userService.roleMatch(role);
        if(match){
          return true;
        }
        else{
          router.navigateByUrl('/forbidden');
          return false;
        }
      }
    }
  }catch(e){
    console.error(e);
  }

    router.navigateByUrl('/login');
    return false;
};

