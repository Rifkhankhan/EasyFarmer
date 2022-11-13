import { LoadingController } from '@ionic/angular';
import { HomeService } from 'src/app/admin/service/home.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'app-add-zone',
	templateUrl: './add-zone.page.html',
	styleUrls: ['./add-zone.page.scss']
})
export class AddZonePage implements OnInit, OnDestroy {
	constructor(
		private router: Router,
		private homeService: HomeService,
		private loadingCtrl: LoadingController
	) {}

	ngOnInit() {}

	close() {
		this.router.navigateByUrl('/admin/tabs/home');
	}

	authSub: Subscription;

	submitForm(form: NgForm) {
		if (!form.valid) {
			return;
		}

		this.loadingCtrl
			.create({
				message: 'Adding....',
				spinner: 'circular',
				animated: true,
				duration: 500
			})
			.then(el => {
				el.present();
				this.authSub = this.homeService
					.addZone(form.value.zoneNameEnglish,form.value.zoneNameTamil)
					.subscribe(() => {
						el.dismiss();
					});
				this.router.navigateByUrl('/admin/tabs/home');
			});
	}

	ngOnDestroy(): void {
		if (this.authSub) {
			this.authSub.unsubscribe();
		}
	}
}
