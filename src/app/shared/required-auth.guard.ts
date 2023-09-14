import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class RequireAuthenticatedUserRouteGuard implements CanActivate {

    constructor(private authService: AuthService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLogin();
    }

    checkLogin() {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        else {
            this.router.navigate(['login']);
            return false;
        }

    }
}