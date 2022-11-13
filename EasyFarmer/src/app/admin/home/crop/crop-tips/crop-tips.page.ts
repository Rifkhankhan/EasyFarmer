import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
	AlertController,
	AnimationController,
	IonItemSliding,
	LoadingController,
	ModalController,
	SegmentChangeEventDetail
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CropTips } from 'src/app/admin/models/croptips.models';
import { HomeService } from 'src/app/admin/service/home.service';
import { Crop } from 'src/app/models/crop.model';
import { AddtipPage } from './addtip/addtip.page';

@Component({
	selector: 'app-crop-tips',
	templateUrl: './crop-tips.page.html',
	styleUrls: ['./crop-tips.page.scss']
})
export class CropTipsPage implements OnInit, OnDestroy {
	constructor(
    private router:Router,
    private loadCtrl: LoadingController,
		private modelCtrl: ModalController,
		private homeService: HomeService,
		private route: ActivatedRoute,
		private alertCtrl: AlertController
	) {}

	tipSub: Subscription;
	idSub: Subscription;
	cropTips: CropTips[];
	crop: Crop;
	isLoading = false;
	cropSub: Subscription;
	cropTip: CropTips;
	sowTips: CropTips[];
	csowTips: CropTips[];
	Tips_for_choosing = 'Tips_for_choosing';
	ngOnInit() {
		this.isLoading = true;

		this.idSub = this.route.paramMap.subscribe(paraMap => {
			if (!paraMap.has('cropId')) {
				return;
			}

			this.cropSub = this.homeService
				.getCrop(paraMap.get('cropId'))
				.subscribe(crop => {
					this.crop = crop;
				});

			this.tipSub = this.homeService
				.fetchAlltips(this.crop.name)
				.subscribe(tips => {
					if (tips.message) {
						this.message = tips.message;
						this.isLoading = false;
					} else {
						this.cropTips = tips;
						this.isLoading = false;
					}
				});
		});
	}

	doRefresh(event) {
		setTimeout(() => {
			this.isLoading = true;

			this.idSub = this.route.paramMap.subscribe(paraMap => {
				if (!paraMap.has('cropId')) {
					return;
				}

				this.cropSub = this.homeService
					.getCrop(paraMap.get('cropId'))
					.subscribe(crop => {
						this.crop = crop;
					});

				this.tipSub = this.homeService
					.fetchAlltips(this.crop.name)
					.subscribe(tips => {
						if (tips.message) {
							this.message = tips.message;
							this.isLoading = false;
						} else {
							this.cropTips = tips;
							this.isLoading = false;
						}
					});
			});
			event.target.complete();
		}, 2000);
	}
	message: string;
	ionViewWillEnter() {
		this.isLoading = true;

		this.idSub = this.route.paramMap.subscribe(paraMap => {
			if (!paraMap.has('cropId')) {
				return;
			}

			this.cropSub = this.homeService
				.getCrop(paraMap.get('cropId'))
				.subscribe(crop => {
					this.crop = crop;
				});

			this.tipSub = this.homeService
				.fetchAlltips(this.crop.name)
				.subscribe(tips => {
					if (tips.message) {
						this.message = tips.message;
						this.isLoading = false;
					} else {
						this.cropTips = tips;
						this.isLoading = false;
					}
				});
		});
	}

	showPage() {}
	deletSub: Subscription;

	deleteTip(id: string,item:IonItemSliding) {
		this.alertCtrl
			.create({
				header: 'Do You Want to Delete',
				message: 'If you delete it will be removed',
				buttons: [
					{
						text: 'Okay',
						handler: () => {
							this.loadCtrl
								.create({
									message: 'Deleting...',
									animated: true,
									duration: 500,
									keyboardClose: false,
									spinner: 'circles'
								})
								.then(loadingEl => {
                  item.close()
									loadingEl.present();
									this.deletSub = this.homeService
										.DeleteTip(id)
										.subscribe(() => {
											loadingEl.dismiss();
										});
								});
						}
					},
					{
						text: 'Cancel'
					}
				]
			})
			.then(e => {
				e.present();
			});

	
	}
	ngOnDestroy() {
		if (this.tipSub || this.cropSub || this.idSub || this.deletSub ) {
			this.tipSub.unsubscribe();
			this.cropSub.unsubscribe();
			this.idSub.unsubscribe();
			if(this.deletSub)
				this.deletSub.unsubscribe();
		}
	}
}
