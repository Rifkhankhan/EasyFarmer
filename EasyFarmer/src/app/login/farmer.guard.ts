import { Preferences } from '@capacitor/preferences';
import { Injectable, OnInit } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Injectable({
	providedIn: 'root'
})
export class FarmerGuard implements CanActivate, OnInit {
	constructor(private authService: AuthService, private router: Router) {}

	authSub: Subscription;
	role: string;
	ngOnInit(): void {
		Preferences.get({ key: 'userData' }).then(data => {
			this.role = JSON.parse(data.value);
		});
	}

	ionViewWillEnter() {
		Preferences.get({ key: 'userData' }).then(data => {
			this.role = JSON.parse(data.value);
		});
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		return this.authService.isAuthenticated.pipe(
			take(1),
			switchMap(isAuthenticated => {
				if (!isAuthenticated) {
					return this.authService.autoLogin();
				} else {
					return of(isAuthenticated);
				}
			}),
			tap(isAuthenticted => {
				if (!isAuthenticted) {
					this.router.navigateByUrl('/login');
				}
			})
		);
	}
	// else {
	//   console.log(this.role);
	//   console.log(typeof this.role);

	// 	return false;
	// }
	// }
}
