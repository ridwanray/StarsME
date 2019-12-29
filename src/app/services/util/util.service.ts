import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController, PopoverController } from '@ionic/angular';
import { AccountPopoverComponent } from 'src/app/components/account-popover/account-popover.component';
import { Student } from 'src/app/models/student';
import { Professor } from 'src/app/models/professor';

@Injectable()

export class UtilService {

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private popoverCtrl : PopoverController) { }

  doPopover(ev: Event, user : Student | Professor, role?: boolean) {
    this.popoverCtrl.create({
      animated: true,
      translucent: true,
      event: ev,
      componentProps: {
        'user' : user,
        'role' : role
      },
      component: AccountPopoverComponent
    }).then(popver => popver.present()).catch(err => console.error('Popover Error:' + err));

  }

  doToast(title: string, message: string) : void  {
     this.toastCtrl.create({
      header: title,
      message: message,
      mode : "ios", 
      position: "top",
      duration: 3000,
      color: 'dark',
      animated: true
    }).then(toast => toast.present()).catch(err => console.error("Toast Error: " + err));

  }

  doLoading(message: string) : void {
    this.loadingCtrl.create({
      message: message,
      animated: true,
      mode: "ios",
      duration: 3000, 
    }).then(loading => loading.present()).catch(err => console.log('Loading Error', err));
  }

  doAlert(title :string, message: string, buttonText: string) : void {
    this.alertCtrl.create({
      header: title,
      message: message,
      mode: "ios",
      animated: true,
      buttons: [buttonText]
    }).then(alert => alert.present()).catch(err => console.log("Alert Error:  " + err));
  }

}
