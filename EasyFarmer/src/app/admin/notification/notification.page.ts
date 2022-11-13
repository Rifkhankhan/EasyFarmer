import { NotificationService } from 'src/app/admin/service/notification.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/angular';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.page.html',
	styleUrls: ['./notification.page.scss']
})
export class NotificationPage implements OnInit, OnDestroy {
	constructor(private notificationService: NotificationService) {}
	notifications: Notification[];
	notiSub: Subscription;
	isLoading = false;
	messageTerm = false;

	ngOnInit() {
		this.isLoading = true;
    console.log(this.messageTerm);

		this.notiSub = this.notificationService.AllNotification.subscribe(
			notification => {
				this.notifications = notification;
        console.log(this.notifications);

				this.isLoading = false;
			}
		);
	}

	ionViewWillEnter() {
		this.isLoading = true;

		this.notiSub = this.notificationService
			.fetchAllNotifications()
			.subscribe(notifications => {
				this.notifications = notifications;
				this.isLoading = false;
			});
	}
	// import { Ng2SearchPipeModule } from 'ng2-search-filter';
	// Ng2SearchPipeModule
	segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
		console.log(event.detail.value);
	}

	ngOnDestroy() {
		if (this.notiSub) {
			this.notiSub.unsubscribe;
		}
	}
}
