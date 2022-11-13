import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-popover',
	templateUrl: './popover.page.html',
	styleUrls: ['./popover.page.scss']
})
export class PopoverPage implements OnInit {
	languages = [
		{ text: 'English', value: 'en' },
		{ text: 'Tamil', value: 'ta' }
	];
	selected: string;

	constructor(private popoverCtrl: PopoverController) {}

	ngOnInit() {
		this.selected = 'eng';
	}

	select(lang) {
		this.selected = lang
		this.popoverCtrl.dismiss();
	}
}
