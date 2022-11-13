import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnimalinterventionService } from './../../../../service/animalintervention.service';
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
	selector: 'app-edit',
	templateUrl: './edit.page.html',
	styleUrls: ['./edit.page.scss']
})
export class EditPage implements OnInit, OnDestroy {
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
	form: FormGroup;
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

					this.form = new FormGroup({
						interventionName: new FormControl(
							this.intervention.interventionName,
							{
								validators: [Validators.required, Validators.minLength(3)]
							}
						),
						about: new FormControl(this.intervention.about, {
							validators: [Validators.required, Validators.minLength(3)]
						}),
						whyIsImportant: new FormControl(this.intervention.whyIsImportant, {
							validators: [Validators.required, Validators.minLength(3)]
						}),
						whatIdDoes: new FormControl(this.intervention.whatIdDoes, {
							validators: [Validators.required, Validators.minLength(3)]
						}),
						whyAndWhereItOccours: new FormControl(
							this.intervention.whyAndWhereItOccours,
							{
								validators: [Validators.required, Validators.minLength(3)]
							}
						),
						howToIdentify: new FormControl(this.intervention.howToIdentify, {
							validators: [Validators.required, Validators.minLength(3)]
						}),
						howToManage: new FormControl(this.intervention.howToManage, {
							validators: [Validators.required, Validators.minLength(3)]
						}),
						image: new FormControl(this.intervention.image)
					});
					this.isLoading = false;
				});
		});
	}
	imagePreview: string;

	uploadfile(event: Event) {
		const file = (event.target as HTMLInputElement).files[0];
		this.form.patchValue({ image: file });
		this.form.get('image').updateValueAndValidity();
		const reader = new FileReader();
		reader.onload = () => {
			this.imagePreview = reader.result as string;
		};

		reader.readAsDataURL(file);
	}

	SubmittedForm() {
		if (this.form.invalid) {
			console.log('invalid');

			return;
		} else {

      console.log(this.form.value);

			// this.cropSub = this.homeService
			// 	.addDisease(
			// 		this.form.value.diseaseName,
			// 		this.form.value.about,
			// 		this.crop.name,
			// 		this.form.value.remedyAction,
			// 		this.form.value.image
			// 	)
			// 	.subscribe();

			// this.router.navigate([
			// 	'/admin',
			// 	'tabs',
			// 	'home',
			// 	this.crop.name,
			// 	'diseases'
			// ]);
		}

		this.form.reset();
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

					this.form = new FormGroup({
						about: new FormControl(this.intervention.about, {
							validators: [Validators.required, Validators.minLength(5)]
						}),
						interventionName: new FormControl(
							this.intervention.interventionName,
							{
								validators: [Validators.required, Validators.minLength(5)]
							}
						),
						whyIsImportant: new FormControl(this.intervention.WhyIsImportant, {
							validators: [Validators.required, Validators.minLength(5)]
						}),
						WhatIdDoes: new FormControl(this.intervention.WhatIdDoes, {
							validators: [Validators.required, Validators.minLength(5)]
						}),
						WhyAndWhereItOccours: new FormControl(
							this.intervention.WhyAndWhereItOccours,
							{
								validators: [Validators.required, Validators.minLength(5)]
							}
						),
						HowToIdentify: new FormControl(this.intervention.HowToIdentify, {
							validators: [Validators.required, Validators.minLength(5)]
						}),
						HowToManage: new FormControl(this.intervention.HowToManage, {
							validators: [Validators.required, Validators.minLength(5)]
						}),
						image: new FormControl(this.intervention.image)
					});
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
