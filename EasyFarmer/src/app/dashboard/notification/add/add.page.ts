import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/admin/service/notification.service';
import { AuthService } from 'src/app/login/auth.service';

@Component({
	selector: 'app-add',
	templateUrl: './add.page.html',
	styleUrls: ['./add.page.scss']
})
export class AddPage implements OnInit, OnDestroy {
	constructor(
		private notficationService: NotificationService,
		private router: Router,
		private authService: AuthService
	) {}

	authSub: Subscription;
	userId: string;
	sub: Subscription;

	ngOnInit() {
		this.authSub = this.authService.getUserId.subscribe(userId => {
			this.userId = userId;
		});
	}


	SubmittedForm(form: NgForm) {
		if (!form.valid) {
			return;
		}

		console.log(this.userId);
		console.log(form.value.message);
		this.sub = this.notficationService
			.createNotification(form.value.message, this.userId)
			.subscribe(() => {});
		this.router.navigateByUrl('/dashboard/tabs/notification');
	}

	ngOnDestroy(): void {
		if (this.sub || this.authSub) {
			this.sub.unsubscribe();
			this.authSub.unsubscribe();
		}
	}
}
