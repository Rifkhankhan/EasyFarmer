import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Crop } from 'src/app/models/crop.model';
import { Disease } from 'src/app/models/disease.model';
import { HomeService } from '../../HomeServices/home.service';

@Component({
	selector: 'app-fertilizer-calculator',
	templateUrl: './fertilizer-calculator.page.html',
	styleUrls: ['./fertilizer-calculator.page.scss']
})
export class FertilizerCalculatorPage implements OnInit {
	area: number;
	type: any = null;
	buttonDisabled: boolean = true;

	nitrogen: any;
	posporus: any;
	pottasium: any;
	zinc: any;

	fert = {
		Nitrogen: null,
		Posperous: null,
		Potassium: null,
		Zinc: null
	};

	calculated: boolean = false;

	constructor(
		private homeService: HomeService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	tipSub: Subscription;
	idSub: Subscription;
	diseases: Disease[];
	crop: Crop;
	isLoading = false;
	cropSub: Subscription;

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
		});
	}

	validate() {
		if (this.area > 0 && this.type !== null) {
			this.buttonDisabled = false;
		} else {
			this.buttonDisabled = true;
		}
	}

	Calculate() {
		if (this.crop.name === 'Onion') {
			this.OnionFertCalculator();
		} else if (this.crop.name === 'Carrot') {
			this.CarrotFertCalculator();
		} else if (this.crop.name === 'Ginger') {
			this.GingerFertCalculator();
		} else if (this.crop.name === 'Pottato') {
			this.PottatoFertCalculator();
		} else if (this.crop.name === 'Turmeric') {
			this.TurmericFertCalculator();
		} else if (this.crop.name === 'Paddy') {
			this.PaddyFertCalculator();
		}
	}

	OnionFertCalculator() {
		let c_area = 0;
		if (this.type === 'hect') {
			c_area = this.area * 10000;
		}
		if (this.type === 'acr') {
			c_area = this.area * 4046.86;
		} else {
			c_area = this.area;
		}

		this.fert['Nitrogen'] = (4.5 * c_area).toFixed(2);
		this.fert['Posperous'] = (10 * c_area).toFixed(2);
		this.fert['Potassium'] = (5 * c_area).toFixed(2);

		this.calculated = true;
	}

	CarrotFertCalculator() {
		let c_area = 0;
		if (this.type === 'hect') {
			c_area = this.area * 10000;
		}
		if (this.type === 'acr') {
			c_area = this.area * 4046.86;
		} else {
			c_area = this.area;
		}

		this.fert['Nitrogen'] = (110 / 0.015 * c_area).toFixed(2);
		this.fert['Posperous'] = (85 / 0.015 * c_area).toFixed(2);

		this.calculated = true;
	}

	GingerFertCalculator() {
		let c_area = 0;
		if (this.type === 'hect') {
			c_area = this.area * 10000;
		}
		if (this.type === 'acr') {
			c_area = this.area * 4046.86;
		} else {
			c_area = this.area;
		}

		this.fert['Posperous'] = (50 / 7.4322432 * c_area).toFixed(2);

		this.calculated = true;
	}

	PottatoFertCalculator() {
		let c_area = 0;
		if (this.type === 'hect') {
			c_area = this.area * 10000;
		}
		if (this.type === 'acr') {
			c_area = this.area * 4046.86;
		} else {
			c_area = this.area;
		}

		this.fert['Nitrogen'] = (16.5 * c_area).toFixed(2);
		this.fert['Posperous'] = (27.5 * c_area).toFixed(2);
		this.fert['Potassium'] = (12.5 * c_area).toFixed(2);

		this.calculated = true;
	}

	TurmericFertCalculator() {
		let c_area = 0;
		if (this.type === 'hect') {
			c_area = this.area * 10000;
		}
		if (this.type === 'acr') {
			c_area = this.area * 4046.86;
		} else {
			c_area = this.area;
		}

		this.fert['Posperous'] = (52 / 7.4322432 * c_area).toFixed(2);

		this.calculated = true;
	}

	PaddyFertCalculator() {
		let c_area = 0;
		if (this.type === 'hect') {
			c_area = this.area * 10000;
		}
		if (this.type === 'acr') {
			c_area = this.area * 4046.86;
		} else {
			c_area = this.area;
		}

		this.fert['Nitrogen'] = (0.5 * c_area).toFixed(2);
		this.fert['Posperous'] = (3.5 * c_area).toFixed(2);
		this.fert['Potassium'] = (1.5 * c_area).toFixed(2);
		this.fert['Zinc'] = (0.2 * c_area).toFixed(2);

		this.calculated = true;
	}

	about(id: string) {
		this.router.navigate([
			'/dashboard',
			'tabs',
			'home',
			this.crop.name,
			'diseases',
			'about-disease',
			id
		]);
	}

	remedy(id: string) {
		this.router.navigate([
			'/dashboard',
			'tabs',
			'home',
			this.crop.name,
			'diseases',
			'remedy-disease',
			id
		]);
	}

	ngOnDestroy() {
		if (this.cropSub || this.idSub) {
			this.cropSub.unsubscribe();
			this.idSub.unsubscribe();
		}
	}
}
