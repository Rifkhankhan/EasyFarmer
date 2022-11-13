import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage'; //npm install --save @ionic/storage-angular

@Injectable({
	providedIn: 'root'
})
export class LanguageService {


  selected = '';
	constructor(
		private translateService: TranslateService,
		private storage: Storage
	) {}



 async	setInitialAppLanguage() {
		let language = this.translateService.getBrowserLang();
		this.translateService.setDefaultLang(language);
	 await	this.storage.create();

		this.storage.get('SELECTED_KEY').then(val => {
			if (!val) {
				console.log(language);

				this.setLanguage(language);
				this.selected = language;
			} else {
				this.setLanguage(val);
				this.selected = val;
			}
		});
	}

	getLanguages() {
		return [{ text: 'English', value: 'en' }, { text: 'Tamil', value: 'ta' }];
	}

	setLanguage(lang) {
		console.log(lang);

		this.translateService.use(lang);
		this.selected = lang;
		this.storage.set('SELECTED_KEY', lang);


	}


}
