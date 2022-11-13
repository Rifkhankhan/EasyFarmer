import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
	{
		path: 'tabs',
		component: DashboardPage,
		children: [
			{
				path: 'home',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('./home/home.module').then(m => m.HomePageModule)
					},
					{
						path: ':cropId',
						children: [
							{
								path: '',
								loadChildren: () =>
									import('./home/cropcultivation/cropcultivation.module').then(
										m => m.CropcultivationPageModule
									)
							},
							{
								path: 'crop-tips',
								children: [
									{
										path: '',
										loadChildren: () =>
											import('./home/cropcultivation/crop-tips/crop-tips.module').then(
												m => m.CropTipsPageModule
											)
									},
									{
										path: ':tipId',
										loadChildren: () =>
											import('./home/cropcultivation/crop-tips/show-tips/show-tips.module').then(
												m => m.ShowTipsPageModule
											)
									}
								]
							},
							{
								path: 'diseases',
								children: [
									{
										path: '',
										loadChildren: () =>
											import('./home/cropcultivation/diseases/diseases.module').then(
												m => m.DiseasesPageModule
											)
									},
									{
										path: 'about-disease/:diseaseId',
										loadChildren: () =>
											import('./home/cropcultivation/diseases/about-disease/about-disease.module').then(
												m => m.AboutDiseasePageModule
											)
									},
									{
										path: 'remedy-disease/:diseaseId',
										loadChildren: () =>
											import('./home/cropcultivation/diseases/remedy-disease/remedy-disease.module').then(
												m => m.RemedyDiseasePageModule
											)
									}
								]
							},
							{
								path: 'animal-intervention',
								children: [
									{
										path: '',
										loadChildren: () =>
											import('./home/cropcultivation/animal-intervention/animal-intervention.module').then(
												m => m.AnimalInterventionPageModule
											)
									},
									{
										path: 'view/:interventionId',
										loadChildren: () =>
											import('./home/cropcultivation/animal-intervention/view/view.module').then(
												m => m.ViewPageModule
											)
									}
								]
							}
						]
					}
				]
			},
			{
				path: 'notification',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('./notification/notification.module').then(
								m => m.NotificationPageModule
							)
					},
					{
						path: 'add',
						loadChildren: () =>
							import('./notification/add/add.module').then(m => m.AddPageModule)
					},
					{
						path: 'view/:notificationId',
						loadChildren: () =>
							import('./notification/view/view.module').then(
								m => m.ViewPageModule
							)
					},
					{
						path: 'edit/:notificationId',
						loadChildren: () =>
							import('./notification/edit/edit.module').then(
								m => m.EditPageModule
							)
					}
				]
			},
			{
				path: 'profile',
				children: [
					{
						path: '',
						loadChildren: () =>
							import('./profile/profile.module').then(m => m.ProfilePageModule)
					},
					{
						path: 'reset-password',
						loadChildren: () =>
							import('./profile/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
					}
				]
			},
			{
				path: 'card',
				loadChildren: () =>
					import('./card/card.module').then(m => m.CardPageModule)
			},
			{
				path: '',
				redirectTo: '/dashboard/tabs/home',
				pathMatch: 'full'
			}
		]
	},
	{
		path: 'popover',
		loadChildren: () =>
			import('./popover/popover.module').then(m => m.PopoverPageModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardPageRoutingModule {}
