import { PopoverPage } from './popover/popover.page';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';

import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
	constructor(
		private authService: AuthService,
		private router: Router,
		private popoverCtrl: PopoverController
	) {}

	ngOnInit() {}

	logout() {
		this.authService.logout();
		this.router.navigateByUrl('/login');
	}

}
