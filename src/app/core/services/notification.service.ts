import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService) { 
    this.notifier = notifierService;
  }

  public success(message: any) {
    this.notifier.notify('success', message);
  }

  public error(message: any) {    
    this.notifier.show({
      type: 'error',
      message
    });
  }

  public warning(message: any) {
    this.notifier.notify('warning', message);
  }

  public info(message: any) {
    this.notifier.notify('info', message);
  }

  public closeAll() {
    this.notifier.hideAll();
  }

}
