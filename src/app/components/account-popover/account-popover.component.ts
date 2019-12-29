import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { PopoverController, ModalController, NavParams } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera/camera.service';
import { EditProfilePage } from './edit-profile/edit-profile.page';
import { Student } from 'src/app/models/student';
import { Professor } from 'src/app/models/professor';

@Component({
  selector: 'app-account-popover',
  templateUrl: './account-popover.component.html',
  styleUrls: ['./account-popover.component.scss'],
})
export class AccountPopoverComponent implements OnInit {

  user : Student | Professor; 
  role : boolean; 

  constructor(
    private camera: CameraService,
    private popoverCtrl: PopoverController,
    private storage : Storage,
    private auth: AuthService,
    private router: Router,
    private modalCtrl : ModalController,
    private navPramas : NavParams
    
    ) {
    this.user = this.navPramas.get('user'); 
    this.role = this.navPramas.get('role'); 

   }

  doModol(user: Student | Professor) {
    this.popoverCtrl.dismiss();
    console.log('doModal :',  user);
    this.modalCtrl.create({
      animated: true,
      component: EditProfilePage,
      showBackdrop: true, 
      componentProps: {
        'user' : user,
        'uid' : this.auth.getCurrentUserUid(),
        'role' : this.role,  
      }
    }).then((modal) => modal.present()).catch((err)  => console.log(err)); 
  } 

  ngOnInit() {

    
  }

  close() {
    this.popoverCtrl.dismiss();
  }

    //logout
  logout() : void {
    this.storage.clear();
    this.auth.logout();
    this.popoverCtrl.dismiss();
    this.router.navigateByUrl('/login');
  }
    
  //update profile image
  update() : void  {
      this.popoverCtrl.dismiss();
      this.camera.getPicture(this.role);
  } 

}
