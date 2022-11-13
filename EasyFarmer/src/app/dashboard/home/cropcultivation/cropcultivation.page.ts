import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/dashboard/home/HomeServices/home.service';
import { Crop } from 'src/app/models/crop.model';
import { PopoverPage } from '../../popover/popover.page';

@Component({
	selector: 'app-cropcultivation',
	templateUrl: './cropcultivation.page.html',
	styleUrls: ['./cropcultivation.page.scss']
})
export class CropcultivationPage implements OnInit, OnDestroy {
	constructor(
		private Router: ActivatedRoute,
		private homeService: HomeService,
    private popoverCtrl: PopoverController,
		private transalteService: TranslateService
	) {}
	crop: Crop;
	cropSub: Subscription;
	idSub: Subscription;
	ngOnInit() {
		this.Router.paramMap.subscribe(paramMap => {
			if (!paramMap.has('cropId')) {
				return;
			}

			this.cropSub = this.homeService
				.getCrop(paramMap.get('cropId'))
				.subscribe(crop => {
					this.crop = crop;
				});
		});
	}

	ionViewWillEnter() {
		this.idSub = this.Router.paramMap.subscribe(paramMap => {
			if (!paramMap.has('cropId')) {
				return;
			}

			this.cropSub = this.homeService
				.getCrop(paramMap.get('cropId'))
				.subscribe(crop => {
					this.crop = crop;
				});
		});
	}

	async openLanguagePopover(event: Event) {
		const popover = await this.popoverCtrl.create({
			component: PopoverPage,
			event: event
		});

		await popover.present();
	}
	ngOnDestroy(): void {
		if (this.cropSub || this.idSub) {
			this.cropSub.unsubscribe();
			this.idSub.unsubscribe();
		}
	}
}
