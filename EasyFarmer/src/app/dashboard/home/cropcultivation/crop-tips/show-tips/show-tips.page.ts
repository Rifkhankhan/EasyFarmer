import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	AnimationController,
	LoadingController,
	ModalController
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CropTips } from 'src/app/admin/models/croptips.models';
import { HomeService } from '../../../HomeServices/home.service';

import { Crop } from 'src/app/models/crop.model';

@Component({
	selector: 'app-show-tips',
	templateUrl: './show-tips.page.html',
	styleUrls: ['./show-tips.page.scss']
})
export class ShowTipsPage implements OnInit, OnDestroy {
	constructor(
		private animationCtrl: AnimationController,
		private loadCtrl: LoadingController,
		private modelCtrl: ModalController,
		private homeService: HomeService,
		private route: ActivatedRoute
	) {}

	tipidSub: Subscription;
	cropTip: any;
	isLoading = false;
	cropTipSub: Subscription;

	ngOnInit() {
		this.isLoading = true;

		this.tipidSub = this.route.paramMap.subscribe(paraMap => {
			if (!paraMap.has('tipId')) {
				return;
			}


			this.cropTipSub = this.homeService
				.getTip(paraMap.get('tipId'))
				.subscribe(tip => {
					this.cropTip = tip;
					this.isLoading = false;
				});
		});
	}

	doRefresh(event) {
		setTimeout(() => {
			this.isLoading = true;
      this.tipidSub = this.route.paramMap.subscribe(paraMap => {
				if (!paraMap.has('tipId')) {
					return;
				}

				this.cropTipSub = this.homeService
					.getTip(paraMap.get('tipId'))
					.subscribe(tip => {
						this.cropTip = tip;

						this.isLoading = false;
					});
			});

			event.target.complete();
		}, 2000);
	}

	ionViewWillEnter() {
		this.isLoading = true;
		 this.tipidSub = this.route.paramMap.subscribe(paraMap => {
			if (!paraMap.has('tipId')) {
				return;
			}

			this.cropTipSub = this.homeService
				.getTip(paraMap.get('tipId'))
				.subscribe(tip => {
					this.cropTip = tip;

					this.isLoading = false;
				});
		});
	}

	ngOnDestroy() {
		if (this.cropTipSub  || this.tipidSub)  {
			this.cropTipSub.unsubscribe();
			this.tipidSub.unsubscribe();
		}
	}
}
