import { Subscription } from 'rxjs';
import { Users } from '../../models/users.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/login/auth.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit, OnDestroy {
	constructor(private authService: AuthService) {}
	user: Users;
	userId: string;
	notiSub: Subscription;
	userSub: Subscription;
	isLoading = false;
	ngOnInit() {
		this.isLoading = true;

		this.userSub = this.authService.getUserId.subscribe(userId => {
			this.userId = userId;
		});
		this.notiSub = this.authService.getUser(this.userId).subscribe(user => {
			this.user = user;
			this.isLoading = false;
		});
	}

	ionViewWillEnter() {
		this.isLoading = true;

		this.userSub = this.authService.getUserId.subscribe(userId => {
			this.userId = userId;
		});
		this.notiSub = this.authService.getUser(this.userId).subscribe(user => {
			this.user = user;
			this.isLoading = false;
		});
	}

	ngOnDestroy() {
		if (this.notiSub || this.userSub) {
			this.notiSub.unsubscribe;
			this.userSub.unsubscribe;
		}
	}
}
