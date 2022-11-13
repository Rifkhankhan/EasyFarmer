import { LoadingController } from '@ionic/angular';
import { Notification } from 'src/app/models/notificaiton';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/admin/service/notification.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.page.html',
	styleUrls: ['./edit.page.scss']
})
export class EditPage implements OnInit, OnDestroy {
	constructor(
		private notificationService: NotificationService,
		private route: ActivatedRoute,
		private router: Router,
		private loadCtrl: LoadingController
	) {}
	reactiveform: FormGroup;
	isLoading = false;
	customer: any;
	copycustomer: any;
	paraSub: Subscription;
	notiSub: Subscription;
	authSub: Subscription;
	notification: any;
	ngOnInit() {
		this.isLoading = true;
		this.paraSub = this.route.paramMap.subscribe(paramMap => {
			if (!paramMap.has('notificationId')) {
				return;
			}

			this.notiSub = this.notificationService
				.getNotification(paramMap.get('notificationId'))
				.subscribe(notification => {
					this.notification = notification;

					this.reactiveform = new FormGroup({
						message: new FormControl(notification.message, {
							updateOn: 'blur',
							validators: [Validators.required, Validators.minLength(5)]
						})
					});
					this.isLoading = false;
				});
		});
	}

	onCheckEdit() {
		if (!this.reactiveform.valid) {
			return;
		}

		this.loadCtrl
			.create({
				message: 'Updated..',
				spinner: 'bubbles',
				animated: true,
				duration: 400
			})
			.then(el => {
				el.present();
				this.authSub = this.notificationService
					.updateNotifiction(
						this.notification.notificationId,
						this.reactiveform.value.message,
						this.notification.userId
					)
					.subscribe(() => {
						this.reactiveform.reset();
						this.router.navigateByUrl('/dashboard/tabs/notification');
						el.dismiss();
					});
			});
	}

	ngOnDestroy(): void {
		if (this.paraSub || this.notiSub || this.authSub) {
			this.paraSub.unsubscribe();
			this.notiSub.unsubscribe();
			if (this.authSub) this.authSub.unsubscribe();
		}
	}
}
