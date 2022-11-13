import { AnimalinterventionService } from 'src/app/admin/service/animalintervention.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CropTips } from 'src/app/admin/models/croptips.models';
import { HomeService } from 'src/app/admin/service/home.service';
import { Crop } from 'src/app/models/crop.model';
@Component({
	selector: 'app-add-intervention',
	templateUrl: './add-intervention.page.html',
	styleUrls: ['./add-intervention.page.scss']
})
export class AddInterventionPage implements OnInit, OnDestroy {
	interventionSub: Subscription;
	cropTips: CropTips[];
	form: FormGroup;
	crop: Crop;
	isLoading = false;
	cropSub: Subscription;
	paramSub: Subscription;
	imagePreview: string;
	constructor(
		private loadCtrl: LoadingController,
		private modelCtrl: ModalController,
		private homeService: HomeService,
		private route: ActivatedRoute,
		private router: Router,
		private animalIntervention: AnimalinterventionService
	) {}

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

		this.form = new FormGroup({
			interventionName: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),
			about: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),
			whyIsImportant: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),
			whatIdDoes: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),
			whyAndWhereItOccours: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),
			howToIdentify: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),
			howToManage: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),
			image: new FormControl(null, { validators: [Validators.required] })
		});

		this.isLoading = false;
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
			return;
		}
		this.interventionSub = this.animalIntervention
			.addIntervention(
				this.form.value.about,
				this.crop.name,
				this.form.value.interventionName,
				this.form.value.image,
				this.form.value.whyIsImportant,
				this.form.value.whatIdDoes,
				this.form.value.whyAndWhereItOccours,
				this.form.value.howToIdentify,
				this.form.value.howToManage
			)
			.subscribe(() => {
				// el.dismiss();
				// });
			});

		this.router.navigate([
			'/admin',
			'tabs',
			'home',
			this.crop.name,
			'animal-intervention'
		]);

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

		this.form = new FormGroup({
			interventionName: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),
			about: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),
			whyIsImportant: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),
			whatIdDoes: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),
			whyAndWhereItOccours: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),
			howToIdentify: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),
			howToManage: new FormControl(null, {
				validators: [Validators.required, Validators.minLength(3)]
			}),
			image: new FormControl(null, { validators: [Validators.required] })
		});

		this.isLoading = false;
	}

	ngOnDestroy() {
		if (this.cropSub || this.paramSub || this.interventionSub) {
			this.cropSub.unsubscribe();
			this.paramSub.unsubscribe();
			if (this.interventionSub) this.interventionSub.unsubscribe();
		}
	}
}
