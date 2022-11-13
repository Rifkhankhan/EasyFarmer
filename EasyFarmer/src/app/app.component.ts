import { LanguageService } from './services/language.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(
		private languageService: LanguageService,
		private storage: Storage
	) {
		this.initializeApp();
	}

	async ngOnInit() {
		await this.storage.create();
	}

	async initializeApp() {
		await this.languageService.setInitialAppLanguage();
		await this.storage.create();
	}
}
