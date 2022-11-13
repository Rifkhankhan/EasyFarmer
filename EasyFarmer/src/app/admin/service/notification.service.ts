import { take, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Notification } from 'src/app/models/notificaiton';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {
	constructor(private http: HttpClient) {}

	private _notification = new BehaviorSubject([]);

	get AllNotification() {
		return this._notification.asObservable();
	}

	getNotification(id: string) {
		return this.http
			.get<any>('http://localhost:5000/api/Notification/notification/' + id)
			.pipe(
				take(1),
				map(res => {
					return {
						notificationId: res['id'],
						message: res['message'],
						reply: res['reply'],
						date: res['date'],
						userId: res['userId'],
						replyMessage: res['replyMessage'] ? res['replyMessage'] : '',
						replyDate: res['replyDate'] ? res['replyDate'] : ''
					};
				})
			);
	}

	deleteNotification(id: string) {
		return this.http
			.delete<any>('http://localhost:5000/api/Notification/delete/' + id)
			.pipe(
				take(1),
				switchMap(() => {
					return this.AllNotification;
				}),
				tap(notifications => {
					this._notification.next(
						notifications.filter(p => p.notificationId !== id)
					);
				})
			);
	}

	updateNotifiction(notificationId: string, message: string, userId: string) {
		const newNotification = {
			notificationId: notificationId,
			message: message,
			userId: userId
		};

		return this.http
			.patch<any>(
				'http://localhost:5000/api/Notification/update',
				newNotification
			)
			.pipe(
				take(1),
				switchMap(res => {
					return this.AllNotification;
				}),
				tap(res => {
					this._notification.next(res);
				})
			);
	}

	replyNotifiction(
		notificationId: string,
		message: string,
		replyMessage: string,
		userId: string,
		date: string
	) {
		const replyNotification = {
			notificationId: notificationId,
			message: message,
			userId: userId,
			replyMessage: replyMessage,
			date: date
		};

		return this.http
			.patch<any>(
				'http://localhost:5000/api/Notification/reply',
				replyNotification
			)
			.pipe(
				take(1),
				tap(res => {
					this._notification.next(res);
				})
			);
	}

	createNotification(message: string, userId: string) {
		const newNotification = {
			message: message,
			userId: userId,
			reply: false,
			date: JSON.stringify(new Date())
		};

		return this.http
			.post<any>(
				'http://localhost:5000/api/Notification/create',
				newNotification
			)
			.pipe(
				take(1),
				switchMap(res => {
					return this.AllNotification;
				}),
				tap(res => {
					this._notification.next(res);
				})
			);
	}

	getAllUserNotification(userId: string) {
		return this.http
			.post<any>('http://localhost:5000/api/Notification', {
				userId
			})
			.pipe(
				take(1),
				map(res => {
					const notifications = [];
					for (var notification in res) {
						notifications.push({
							notificationId: res[notification].id,
							date: res[notification].date,
							message: res[notification].message,
							reply: res[notification].reply
						});
					}

					return notifications;
				}),
				tap(data => {
					this._notification.next(data);
				})
			);
	}

	fetchAllNotifications() {
		return this.http.get<any>('http://localhost:5000/api/Notification').pipe(
			take(1),
			map(res => {
				const notifications = [];
				for (var notification of res.notifications) {
					notifications.push({
						notificationId: notification.id,
						date: notification.date,
						message: notification.message,
						reply: notification.reply,
						userId: notification.userId
					});
				}

				return notifications;
			}),
			tap(data => {
				this._notification.next(data);
			})
		);
	}
}
