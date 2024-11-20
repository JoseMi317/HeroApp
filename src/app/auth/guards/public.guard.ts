import { Injectable } from '@angular/core';

import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})

export class PublicGuard {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  private checkAuthStatus():boolean|Observable<boolean> {

    return this.authService.checkAuth()
      .pipe(
        tap(isAuth => console.log('isAuth', isAuth)),
        tap(isAuth => {
          if(isAuth){
            this.router.navigate(['./'])
          }
        }),
        map(isAuth => !isAuth)
      )

  }

  public canMatch: CanMatchFn = (route, segments) => {

    return this.checkAuthStatus();

  };

  public canActivate: CanActivateFn = (route, state) => {

    return this.checkAuthStatus();
  };

}
