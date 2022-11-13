import { LanguageService } from './../../services/language.service';
import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-popover',
	templateUrl: './popover.page.html',
	styleUrls: ['./popover.page.scss']
})
export class PopoverPage implements OnInit {
	languages = [];
	selected = '';

	constructor(
		private popoverCtrl: PopoverController,
		private languageService: LanguageService
	) {}

	ngOnInit() {
		this.languages = this.languageService.getLanguages();
		this.selected = this.languageService.selected;
	}

	select(lang) {
		this.languageService.setLanguage(lang);
		this.popoverCtrl.dismiss();
	}
}
