import { Preferences } from '@capacitor/preferences';
import { Injectable, OnInit } from '@angular/core';
import {
	CanLoad,
	Route,
	Router,
	UrlSegment,
	UrlTree,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanActivate
} from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit {
	constructor(private authService: AuthService, private router: Router) {}

	authSub: Subscription;
	role: string;
	ngOnInit(): void {
		Preferences.get({ key: 'userData' }).then(data => {
			this.role = JSON.parse(data.value).role;
			console.log(this.role);
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


				if (!isAuthenticated ) {
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
	// canLoad(
	// 	route: Route,
	// 	segments: UrlSegment[]
	// ):
	// 	| boolean
	// 	| UrlTree
	// 	| Observable<boolean | UrlTree>
	// 	| Promise<boolean | UrlTree> {
	//     return this.authService.isAuthenticated.pipe(
	//       take(1),
	//       switchMap(isAuthenticated=>{
	//         if(!isAuthenticated){
	//           return this.authService.autoLogin()
	//         }
	//         else{
	//           return of(isAuthenticated)
	//         }
	//       }),
	//       tap(isAuthenticted=>{
	//         if(!isAuthenticted){
	//           this.router.navigateByUrl('/login')
	//         }
	//       })
	//     )
	//   }

	ngOnDestroy(): void {
		if (this.authSub) {
			this.authSub.unsubscribe();
		}
	}
}
