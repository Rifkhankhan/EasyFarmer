import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CropTips } from 'src/app/admin/models/croptips.models';
import { Crop } from 'src/app/models/crop.model';
import { HomeService } from '../../HomeServices/home.service';

@Component({
	selector: 'app-crop-tips',
	templateUrl: './crop-tips.page.html',
	styleUrls: ['./crop-tips.page.scss']
})
export class CropTipsPage implements OnInit, OnDestroy {
	constructor(
		private homeService: HomeService,
		private route: ActivatedRoute
	) {}

	crop: Crop;
	cropSub: Subscription;
	paraSub: Subscription;
	cropidSub: Subscription;
	cropTips: CropTips[];
	isLoading = false;
	ngOnInit() {
		this.isLoading = true;

		this.paraSub = this.route.paramMap.subscribe(paramMap => {
			if (!paramMap.has('cropId')) {
				return;
			}

			this.cropidSub = this.homeService
				.getCrop(paramMap.get('cropId'))
				.subscribe(crop => {
					this.crop = crop;
				});
		});

		this.cropSub = this.homeService.AllcropTips.subscribe(cropTips => {
			this.cropTips = cropTips;
			this.isLoading = false;
		});
	}

	ionViewWillEnter() {
		this.isLoading = true;

		this.paraSub = this.route.paramMap.subscribe(paramMap => {
			if (!paramMap.has('cropId')) {
				return;
			}

			this.cropidSub = this.homeService
				.getCrop(paramMap.get('cropId'))
				.subscribe(crop => {
					this.crop = crop;
				});
		});

		this.cropSub = this.homeService
			.fetchAlltips(this.crop.name)
			.subscribe(cropTips => {
				this.cropTips = cropTips;

				this.isLoading = false;
			});
	}

	ngOnDestroy(): void {
		if (this.cropSub || this.paraSub || this.cropidSub) {
			this.cropSub.unsubscribe();
			this.paraSub.unsubscribe();
			this.cropidSub.unsubscribe();
		}
	}
}
