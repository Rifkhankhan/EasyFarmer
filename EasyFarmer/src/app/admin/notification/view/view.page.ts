import { LoadingController } from '@ionic/angular';
import { Form, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/login/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/admin/service/notification.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'app-view',
	templateUrl: './view.page.html',
	styleUrls: ['./view.page.scss']
})
export class ViewPage implements OnInit, OnDestroy {
	constructor(
		private notificationService: NotificationService,
		private route: ActivatedRoute,
		private authService: AuthService,
		private router: Router,
		private loadCtrl: LoadingController
	) {}
	notiSub: Subscription;
	paraSub: Subscription;
	userSub: Subscription;
	notification: any;
	user: any;
	reply = false;

	// export class Notification {
	//   notificationId: string;
	//   date: string;
	//   message: string;
	//   reply: boolean;
	//   userId: string;
	// }

	isLoading = false;

	ngOnInit() {
		this.isLoading = true;

		this.paraSub = this.route.paramMap.subscribe(paramMap => {
			if (!paramMap.has('id')) {
				return;
			}

			this.notiSub = this.notificationService
				.getNotification(paramMap.get('id'))
				.subscribe(notification => {
					this.notification = notification;
					console.log(this.notification);

					this.userSub = this.authService
						.getUser(notification.userId)
						.subscribe(user => {
							this.user = user;
							this.isLoading = false;
						});
				});
		});
	}

	ionViewWillEnter() {
		this.isLoading = true;

		this.paraSub = this.route.paramMap.subscribe(paramMap => {
			if (!paramMap.has('id')) {
				return;
			}

			this.notiSub = this.notificationService
				.getNotification(paramMap.get('id'))
				.subscribe(notification => {
					this.notification = notification;

					this.userSub = this.authService
						.getUser(notification.userId)
						.subscribe(user => {
							this.user = user;

							this.isLoading = false;
						});
				});
		});
	}
	changeReplyMode() {
		this.reply = !this.reply;
		console.log(this.reply);
	}

	replySub: Subscription;
	submitForm(form: NgForm) {
		if (!form.valid) {
			return;
		}

		this.loadCtrl
			.create({
				message: 'Replying...',
				spinner: 'crescent',
				animated: true,
				duration: 500
			})
			.then(el => {
				el.present();
				this.replySub = this.notificationService
					.replyNotifiction(
						this.notification.notificationId,
						this.notification.message,
						form.value.replyMessage,
						this.user.userId,
						this.notification.date
					)
					.subscribe(() => {
						el.dismiss();
						this.router.navigateByUrl('/admin/tabs/notification');
					});
			});
	}

	ngOnDestroy(): void {
		if (this.paraSub || this.notiSub || this.userSub || this.replySub) {
			this.paraSub.unsubscribe();
			this.notiSub.unsubscribe();
			this.userSub.unsubscribe();

			if (this.replySub) this.replySub.unsubscribe();
		}
	}
}
