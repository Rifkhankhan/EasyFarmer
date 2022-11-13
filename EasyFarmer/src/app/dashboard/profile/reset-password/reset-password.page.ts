import { AuthService } from 'src/app/login/auth.service';
import { AnimalinterventionService } from 'src/app/admin/service/animalintervention.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CropTips } from 'src/app/admin/models/croptips.models';
import { HomeService } from 'src/app/admin/service/home.service';
import { Crop } from 'src/app/models/crop.model';
import { Users } from 'src/app/models/users.model';
@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.page.html',
	styleUrls: ['./reset-password.page.scss']
})
export class ResetPasswordPage implements OnInit {
	interventionSub: Subscription;
	cropTips: CropTips[];
	form: FormGroup;
	crop: Crop;
	isLoading = false;
	cropSub: Subscription;
	paramSub: Subscription;
	imagePreview: string;
	user: Users;
	userId: string;
	notiSub: Subscription;
	userSub: Subscription;
	constructor(
		private loadCtrl: LoadingController,
		private modelCtrl: ModalController,
		private homeService: HomeService,
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.isLoading = true;

		this.userSub = this.authService.getUserId.subscribe(userId => {
			this.userId = userId;
		});
		this.notiSub = this.authService.getUser(this.userId).subscribe(user => {
			this.user = user;
			console.log(this.user);
		});

		this.form = new FormGroup({
			currentPassword: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(5)]
			}),
			newPassword: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(5)]
			})
		});

		this.isLoading = false;
	}

	SubmittedForm() {
		if (this.form.invalid) {
			return;
		}

		this.loadCtrl
			.create({
				message: 'Updating....',
				spinner: 'lines-sharp-small',
				duration: 500
			})
			.then(el => {
				el.present();
				this.interventionSub = this.authService
					.updatePassword(
						this.form.value.currentPassword,
						this.form.value.newPassword,
						this.userId
					)
					.subscribe(
						res => {
							console.log(res);
							el.dismiss();
						},
						error => {
							console.log(error.message);
						}
					);
				this.router.navigate(['/dashboard', 'tabs', 'profile']);
			});

		this.form.reset();
	}

	ionViewWillEnter() {
		this.isLoading = true;

		this.userSub = this.authService.getUserId.subscribe(userId => {
			this.userId = userId;
		});
		this.notiSub = this.authService.getUser(this.userId).subscribe(user => {
			this.user = user;
			console.log(this.user);
		});

		this.form = new FormGroup({
			currentPassword: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(5)]
			}),
			newPassword: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(5)]
			})
		});

		this.isLoading = false;
	}

	ngOnDestroy() {
		if (this.userSub || this.notiSub || this.interventionSub) {
			this.userSub.unsubscribe();
			this.notiSub.unsubscribe();
			this.interventionSub.unsubscribe();
		}
	}
}
