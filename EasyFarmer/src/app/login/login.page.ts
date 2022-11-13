import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponseData } from './auth.service';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit, OnDestroy {
	constructor(
		private router: Router,
		private loadingCtrl: LoadingController,
		private authService: AuthService,
		private alertCtrl: AlertController,
		private useService: UserService
	) {}

	isLoading = false;
	islogin = true;
	authSub: Subscription;
	ngOnInit() {}

	submittedForm(form: NgForm) {
		if (!form.valid) {
			return;
		}

		const userName = form.value.userName;
		const password = form.value.password;

		this.authenticate(userName, password);
	}

	authenticate(userName: string, password: string) {
		this.isLoading = true;
		this.loadingCtrl
			.create({ keyboardClose: true, message: 'Logging in...' })
			.then(loadingEl => {
				loadingEl.present();

				this.authSub = this.authService.login(userName, password).subscribe(
					resData => {
						if (resData.data.role === 'farmer') {
							this.router.navigateByUrl('/dashboard/tabs/home');
						} else {
							this.router.navigateByUrl('/admin/tabs/home');
						}
						this.isLoading = false;
						loadingEl.dismiss();
					},
					errRes => {
						loadingEl.dismiss();

						let message = 'Could not sign you in, please try again.';

						this.showAlert(message);
					}
				);
			});
	}

	private showAlert(message: string) {
		this.alertCtrl
			.create({
				header: 'Authentication failed',
				message: message,
				buttons: ['Okay']
			})
			.then(alertEl => alertEl.present());
	}

	ngOnDestroy(): void {
		if (this.authSub) {
			this.authSub.unsubscribe();
		}
	}
}
