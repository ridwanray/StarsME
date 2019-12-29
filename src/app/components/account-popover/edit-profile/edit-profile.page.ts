import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Student } from 'src/app/models/student';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { Professor } from 'src/app/models/professor';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  updateFrom : FormGroup;
  user : Student | Professor;
  uid : string; 
  role : boolean;
  userDoc : AngularFirestoreDocument<Student | Professor>; 

  constructor(private alertCtrl: AlertController ,private afs: AngularFirestore, private fb: FormBuilder , private modalCtrl: ModalController, private NavParams : NavParams) { 

    this.user = this.NavParams.get('user'); 
    this.uid = this.NavParams.get('uid'); 
    this.role = this.NavParams.get('role');
    this.userDoc = this.role ?  this.afs.doc(`/professors/${this.uid}`) : this.afs.doc(`/students/${this.uid}`);
  }

  doAlert(title :string, message: string, buttonText: string) : void {
    //console.log('alert message: ', message);
    this.alertCtrl.create({
      header: title,
      message: message,
      mode: "ios",
      animated: true,
      buttons: [buttonText]
    }).then(alert => alert.present()).catch(err => console.log("Alert Error:  " + err));
  }

  close() {
    this.modalCtrl.dismiss();
  }
 
  update() : void {

    if(this.updateFrom.invalid) {
      this.doAlert('Error', 'Invalid Form' ,'Ok');
    } 

    if(this.updateFrom.valid) {

    //console.log('updateFrom:', this.updateFrom.value);
   

    this.userDoc.update(this.updateFrom.value).then(() => {
    this.doAlert('Success', 'Profile Updated', 'OK');
    this.modalCtrl.dismiss();
    })
    .catch((err) => this.doAlert('Error', err, 'Ok'))
    

  } 
  }

  ngOnInit() {

    this.updateFrom = this.fb.group({
      // alternative to:
      /* this.updateFrom.get('name').setValue(this.user.name); */
      // set the default initial value 
      name : [this.user.name],
      email : [this.user.email ,Validators.compose([Validators.email])],
      tel :  [this.user.tel], 
      address: [this.user.address],
      aboutMe: [this.user.aboutMe]
});

}

}
