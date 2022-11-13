import { AnimalinterventionService } from './../../../../../admin/service/animalintervention.service';

import { Intervention } from './../../../../../models/intervention.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	AnimationController,
	LoadingController,
	ModalController
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CropTips } from 'src/app/admin/models/croptips.models';
import { HomeService } from 'src/app/admin/service/home.service';
import { Crop } from 'src/app/models/crop.model';

@Component({
	selector: 'app-view',
	templateUrl: './view.page.html',
	styleUrls: ['./view.page.scss']
})
export class ViewPage implements OnInit, OnDestroy {
	constructor(
		private loadCtrl: LoadingController,
		private modelCtrl: ModalController,
		private homeService: HomeService,
		private route: ActivatedRoute,
		private interventionService: AnimalinterventionService
	) {}

	tipSub: Subscription;
	cropTips: CropTips[];
	crop: Crop;
	isLoading = false;
	cropSub: Subscription;
	paramSub: Subscription;
	paraminterSub: Subscription;
	intervention: any;
	interventionSub: Subscription;
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

		this.paraminterSub = this.route.paramMap.subscribe(paraMap => {
			if (!paraMap.has('interventionId')) {
				return;
			}

			this.interventionSub = this.interventionService
				.getIntervention(paraMap.get('interventionId'))
				.subscribe(intervention => {
					this.intervention = intervention;

					this.isLoading = false;
				});
		});
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

		this.paraminterSub = this.route.paramMap.subscribe(paraMap => {
			if (!paraMap.has('interventionId')) {
				return;
			}

			this.interventionSub = this.interventionService
				.getIntervention(paraMap.get('interventionId'))
				.subscribe(intervention => {
					this.intervention = intervention;

					this.isLoading = false;
				});
		});
	}

	ngOnDestroy() {
		if (
			this.paramSub ||
			this.cropSub ||
			this.interventionSub ||
			this.paraminterSub
		) {
			this.cropSub.unsubscribe();
			this.paramSub.unsubscribe();
			this.interventionSub.unsubscribe();
			this.paraminterSub.unsubscribe();
		}
	}
}
