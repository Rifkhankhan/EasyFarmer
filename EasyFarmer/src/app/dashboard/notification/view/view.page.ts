import { AuthService } from './../../../login/auth.service';
import { Notification } from './../../../models/notificaiton';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/admin/service/notification.service';
import { User } from 'src/app/login/user.model';
import { Users } from 'src/app/models/users.model';

@Component({
	selector: 'app-view',
	templateUrl: './view.page.html',
	styleUrls: ['./view.page.scss']
})
export class ViewPage implements OnInit, OnDestroy {
	constructor(
		private notificationService: NotificationService,
		private router: ActivatedRoute,
		private authService: AuthService
	) {}

	isLoading = false;
	paraSub: Subscription;
	notiSub: Subscription;
	authSub: Subscription;
	notification: Notification;
  user:Users;
	ngOnInit() {
		this.isLoading = true;
		this.paraSub = this.router.paramMap.subscribe(paramMap => {
			if (!paramMap.has('notificationId')) {
				return;
			}

			this.notiSub = this.notificationService
				.getNotification(paramMap.get('notificationId'))
				.subscribe(notification => {
					this.notification = notification;
					this.authSub = this.authService
						.getUser(this.notification.userId)
						.subscribe(user => {
							this.user = user
							this.isLoading = false;
						});
				});
		});
	}

	ngOnDestroy(): void {
		if (this.paraSub || this.notiSub || this.authSub) {
			this.paraSub.unsubscribe();
			this.notiSub.unsubscribe();
			this.authSub.unsubscribe();
		}
	}
}
