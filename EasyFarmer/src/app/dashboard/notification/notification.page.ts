import { AuthService } from 'src/app/login/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
	AlertController,
	IonItemSliding,
	LoadingController,
	SegmentChangeEventDetail
} from '@ionic/angular';
import { Subscription } from 'rxjs';

import { NotificationService } from 'src/app/admin/service/notification.service';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.page.html',
	styleUrls: ['./notification.page.scss']
})
export class NotificationPage implements OnInit, OnDestroy {
	constructor(
		private notificationService: NotificationService,
		private loadCtrl: LoadingController,
		private alertCtrl: AlertController,
		private authService: AuthService
	) {}

	notifications: Notification[];
	notiSub: Subscription;
	isLoading = false;
	deleteSub: Subscription;
	messageTerm: any = false;
	userId: string;
	userSub: Subscription;

	userIcons = [
		'assets/UserIcons/avatar.png',
		'assets/UserIcons/girl.png',
		'assets/UserIcons/man1.png',
		'assets/UserIcons/man2.png',
		'assets/UserIcons/man3.png',
		'assets/UserIcons/user1.png',
		'assets/UserIcons/man.png',
		'assets/UserIcons/user.png',
		'assets/UserIcons/woman.png',
		'assets/UserIcons/profile.png'
	];
	ngOnInit() {
		this.isLoading = true;
		this.notiSub = this.notificationService.AllNotification.subscribe(
			notification => {
				this.notifications = notification;
				this.isLoading = false;
			}
		);

		this.userSub = this.authService.getUserId.subscribe(userId => {
			this.userId = userId;
			this.isLoading = false;
		});
	}

	ionViewWillEnter() {
		this.isLoading = true;

		this.notiSub = this.notificationService
			.fetchAllNotifications()
			.subscribe(notifications => {
				this.notifications = notifications;
			});

		this.userSub = this.authService.getUserId.subscribe(userId => {
			this.userId = userId;
			this.isLoading = false;
		});
	}

	edit(id: string) {
		console.log(id);
	}

	delete(id: string, item: IonItemSliding) {
		this.alertCtrl
			.create({
				header: 'Delete This Message!',
				message: 'Do You Want to Delete?',
				buttons: [
					{
						text: 'OK',
						handler: () => {
							item.close();

							this.loadCtrl
								.create({
									message: 'Deleting...',
									animated: true,
									duration: 500,
									spinner: 'bubbles'
								})
								.then(el => {
									el.present();
									this.deleteSub = this.notificationService
										.deleteNotification(id)
										.subscribe(() => {
											el.dismiss();
										});
								});
						}
					},
					{
						text: 'Cancel',
						handler: () => {
							item.close();
						}
					}
				]
			})
			.then(e => {
				e.present();
			});
	}

	segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
	
	}

	change() {
		this.messageTerm = this.userId;
	}

	ngOnDestroy() {
		if (this.notiSub || this.deleteSub || this.userSub) {
			this.notiSub.unsubscribe;
			this.userSub.unsubscribe;
			if (this.delete) this.deleteSub.unsubscribe;
		}
	}
}
