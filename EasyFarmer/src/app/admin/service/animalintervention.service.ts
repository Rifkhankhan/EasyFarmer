import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Intervention } from 'src/app/models/intervention.model';

@Injectable({
	providedIn: 'root'
})
export class AnimalinterventionService {
	constructor(private http: HttpClient) {}

	private _intervention = new BehaviorSubject<Intervention[]>([]);

	get AllInterventions() {
		return this._intervention.asObservable();
	}

	fetchInterventions(name: string) {
		return this.http
			.get<any>('http://localhost:5000/api/Intervention/' + name)
			.pipe(
				take(1),
				map(data => {
					if (data.message) {
						return data;
					} else {
						const intervetions = [];
						for (var intervention of data.cropInteventions) {
							intervetions.push({
								interventionId: intervention.id,
								about: intervention.about,
								whyIsImportant: intervention.whyIsImportant,
								cropName: intervention.cropName,
								image: intervention.image,
								interventionName: intervention.interventionName,
								whatIdDoes: intervention.whatIdDoes,
								whyAndWhereItOccours: intervention.whyAndWhereItOccours,
								howToIdentify: intervention.howToIdentify,
								howToManage: intervention.howToManage
							});
						}

						return intervetions;
					}
				}),
				tap(data => {
					this._intervention.next(data);
				})
			);
	}

	addIntervention(
		about: string,
		cropName: string,
		interventionName: string,
		image: File,
		whyIsImportant: string,
		whatIdDoes: string,
		whyAndWhereItOccours: string,
		howToIdentify: string,
		howToManage: string
	) {
		const formData = new FormData();
		formData.append('image', image);
		formData.append('about', about);
		formData.append('interventionName', interventionName);
		formData.append('whyIsImportant', whyIsImportant);
		formData.append('cropName', cropName);
		formData.append('whatIdDoes', whatIdDoes);
		formData.append('whyAndWhereItOccours', whyAndWhereItOccours);
		formData.append('howToIdentify', howToIdentify);
		formData.append('howToManage', howToManage);

		return this.http
			.post<any>(
				'http://localhost:5000/api/Intervention/createIntervention',
				formData
			)
			.pipe(
				take(1),
				switchMap(() => {
					return this.AllInterventions;
				}),
				tap(interventions => {
					this._intervention.next(interventions);
				})
			);
	}



	getIntervention(id: string) {
		return this.http
			.get<any>('http://localhost:5000/api/Intervention/interventions/' + id)
			.pipe(
				take(1),
				map(data => {

					return {
						interventionId: data.intervention.id,
						about: data.intervention.about,
						whyIsImportant: data.intervention.WhyIsImportant,
						cropName: data.intervention.cropName,
						image: data.intervention.image,
						interventionName: data.intervention.interventionName,
						whatIdDoes: data.intervention.WhatIdDoes,
						whyAndWhereItOccours: data.intervention.WhyAndWhereItOccours,
						howToIdentify: data.intervention.HowToIdentify,
						howToManage: data.intervention.HowToManage
					};
				})
			);
	}

	// updateIntervention(id: string, name: string, information: string) {
	// 	let updatedtips: CropTips[];
	// 	return this.AllcropTips.pipe(
	// 		take(1),
	// 		switchMap(tips => {
	// 			if (!tips || tips.length <= 0) {
	// 				return this.fetchAlltips(name);
	// 			} else {
	// 				return of(tips);
	// 			}
	// 		}),
	// 		switchMap(tips => {
	// 			const index = tips.findIndex(p => p.tipsId === id);
	// 			const oldtip = tips[index];

	// 			updatedtips = [...tips];

	// 			updatedtips[index] = {
	// 				tipsId: id,
	// 				name: name,

	// 				information: information
	// 			};

	// 			return this.http.put(
	// 				`https://greenproject-6f3b9-default-rtdb.firebaseio.com/croptips/${id}.json`,
	// 				{ ...updatedtips[index], tipsId: null }
	// 			);
	// 		}),
	// 		tap(() => {
	// 			this._croptips.next(updatedtips);
	// 		})
	// 	);
	// }

	DeleteIntervention(id: string) {
		return this.http
			.delete(
				'http://localhost:5000/api/Intervention/cropInterventions/delete/' + id
			)
			.pipe(
				take(1),
				switchMap(res => {
					return this._intervention;
				}),
				tap(interventions => {
					this._intervention.next(
						interventions.filter(p => p.interventionId !== id)
					);
				})
			);
	}
}
