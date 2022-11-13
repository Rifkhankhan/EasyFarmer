import { FarmerGuard } from './login/farmer.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './login/auth.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		loadChildren: () =>
			import('./login/login.module').then(m => m.LoginPageModule)
	},
	{
		path: 'register',
		loadChildren: () =>
			import('./register/register.module').then(m => m.RegisterPageModule)
	},
	{
		path: 'dashboard',
		loadChildren: () =>
			import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
		canActivate: [FarmerGuard]
	},
	{
		path: 'admin',
		loadChildren: () =>
			import('./admin/admin.module').then(m => m.AdminPageModule),
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
