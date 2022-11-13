import { AnimalinterventionService } from './../../../service/animalintervention.service';
import { Intervention } from './../../../../models/intervention.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
	AlertController,
	IonItemSliding,
	LoadingController,
	ModalController
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CropTips } from 'src/app/admin/models/croptips.models';
import { HomeService } from 'src/app/admin/service/home.service';
import { Crop } from 'src/app/models/crop.model';

@Component({
	selector: 'app-animal-intervention',
	templateUrl: './animal-intervention.page.html',
	styleUrls: ['./animal-intervention.page.scss']
})
export class AnimalInterventionPage implements OnInit, OnDestroy {
	constructor(
		private loadCtrl: LoadingController,
		private modelCtrl: ModalController,
		private homeService: HomeService,
		private route: ActivatedRoute,
		private interventionService: AnimalinterventionService,
		private alertCtrl: AlertController,
		private router: Router
	) {}

	tipSub: Subscription;
	cropTips: CropTips[];
	crop: Crop;
	isLoading = false;
	cropSub: Subscription;
	paramSub: Subscription;
	interventions: Intervention[];
	interventionSub: Subscription;
	deleteSub: Subscription;
	ngOnInit() {
		this.isLoading = true;
		this.paramSub = this.route.paramMap.subscribe(paraMap => {
			if (!paraMap.has('cropId')) {
				return;
			}

			this.cropSub = this.homeService
				.getCrop(paraMap.get('cropId'))
				.subscribe(crop => {
					this.crop = crop;
				});
		});

		this.interventionSub = this.interventionService.AllInterventions.subscribe(
			interventions => {
				this.interventions = interventions;

				this.isLoading = false;
			}
		);
	}

	ionViewWillEnter() {
		this.isLoading = true;
		this.paramSub = this.route.paramMap.subscribe(paraMap => {
			if (!paraMap.has('cropId')) {
				return;
			}

			this.cropSub = this.homeService
				.getCrop(paraMap.get('cropId'))
				.subscribe(crop => {
					this.crop = crop;
				});
		});

		this.interventionSub = this.interventionService
			.fetchInterventions(this.crop.name)
			.subscribe(interventions => {
				this.interventions = interventions;
				this.isLoading = false;
			});
	}

	delete(id: string, item: IonItemSliding) {
		this.alertCtrl
			.create({
				header: 'Delete Animal Intervention',
				message: 'Are You Sure',
				buttons: [
					{
						text: 'OK',
						handler: () => {
							this.loadCtrl
								.create({
									message: 'Deleting...',
									spinner: 'crescent',
									animated: true,
									duration: 500
								})
								.then(e => {
									e.present();
									item.close();
									this.deleteSub = this.interventionService
										.DeleteIntervention(id)
										.subscribe(data => {
											e.dismiss();
										});
								});
						}
					},
					{
						text: 'Cancel',
						handler: () => {
							item.close();
						}
					}
				]
			})
			.then(el => {
				el.present();
			});
	}

	ngOnDestroy() {
		if (this.paramSub || this.cropSub || this.interventionSub) {
			this.cropSub.unsubscribe();
			this.paramSub.unsubscribe();
			this.interventionSub.unsubscribe();
		}
	}
}
