import { Storage } from '@ionic/storage';
import { PopoverPage } from './../dashboard/popover/popover.page';
import { SegmentChangeEventDetail, PopoverController } from '@ionic/angular';
import { HomeService } from 'src/app/admin/service/home.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { UserService } from '../services/user.service';
import { LanguageService } from '../services/language.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit, OnDestroy {
	constructor(
		private userService: UserService,
		private route: Router,
		private authService: AuthService,
		private homeService: HomeService,
		private popoverCtrl: PopoverController,
		private languageService: LanguageService,
		private storage: Storage
	) {}

	authSub: Subscription;
	zoneSub: Subscription;
	isLoading = false;
	lang;
	zones = [];
	ngOnInit() {
		this.isLoading = true;
		this.zoneSub = this.homeService.getZones().subscribe(zones => {
			this.zones = zones;
			console.log(zones);

			this.isLoading = false;
		});
	}

	submittedForm(form: NgForm) {
		if (!form.valid) {
			console.log('not');

			return;
		}

		console.log(form);

		this.authSub = this.authService
			.signup(
				form.value.username,
				form.value.yourname,
				form.value.mobile,
				form.value.nic,
				form.value.address,
				form.value.zone,
				form.value.password
			)
			.subscribe(() => {
				this.route.navigateByUrl('/dashboard/tabs/home');
			});
	}

	// ionViewWillEnter() {
  //  this.lang = this.languageService.getLanguageSub().sub
  //  console.log(this.lang);

  // }
	async openLanguagePopover(event: Event) {
		const popover = await this.popoverCtrl.create({
			component: PopoverPage,
			event: event
		});

		await popover.present();
	}

	ngOnDestroy(): void {
		if (this.zoneSub || this.authSub) {
			this.zoneSub.unsubscribe();
			this.authSub.unsubscribe();
		}
	}
}
