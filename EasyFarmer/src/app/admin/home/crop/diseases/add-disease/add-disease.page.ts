import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/admin/service/home.service';
import { Crop } from 'src/app/models/crop.model';
import { Disease } from 'src/app/models/disease.model';

@Component({
	selector: 'app-add-disease',
	templateUrl: './add-disease.page.html',
	styleUrls: ['./add-disease.page.scss']
})
export class AddDiseasePage implements OnInit, OnDestroy {
	tipSub: Subscription;
	paramSub: Subscription;
	diseases: Disease[];
	crop: Crop;
	isLoading = false;
	cropSub: Subscription;
	form: FormGroup;
	imagePreview: string;

	constructor(
		private loadCtrl: LoadingController,
		private homeService: HomeService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.isLoading = true;

		this.paramSub = this.route.paramMap.subscribe(paramMap => {
			if (!paramMap.has('cropId')) {
				return;
			}
			this.cropSub = this.homeService
				.getCrop(paramMap.get('cropId'))
				.subscribe(crop => {
					this.isLoading = false;
					this.crop = crop;
				});
		});

		this.form = new FormGroup({
			diseaseName: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),
			about: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),
			remedyAction: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),
			image: new FormControl(null, { validators: [Validators.required] })
		});
	}

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
			this.cropSub = this.homeService
				.addDisease(
					this.form.value.diseaseName,
					this.form.value.about,
					this.crop.name,
					this.form.value.remedyAction,
					this.form.value.image
				)
				.subscribe();

			this.router.navigate([
				'/admin',
				'tabs',
				'home',
				this.crop.name,
				'diseases'
			]);
		}

		this.form.reset();
	}

	ngOnDestroy(): void {
		if (this.cropSub || this.paramSub) {
			this.cropSub.unsubscribe();
			this.paramSub.unsubscribe();
		}
	}
}
