import { Injectable } from '@angular/core';
import { Camera, CameraOptions} from "@ionic-native/camera/ngx";
import { UserService } from '../user/user.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { Student } from 'src/app/models/student';
import { Professor } from 'src/app/models/professor';

@Injectable()

export class CameraService {

  constructor(private alertCtrl: AlertController,  private userSevice: UserService, private afs: AngularFirestore, private camera: Camera) {

   }

   doAlert(title :string, message: string, buttonText: string) : void {
    console.log('alert message: ', message);
    this.alertCtrl.create({
      header: title,
      message: message,
      mode: "ios",
      buttons: [buttonText]
    }).then(alert => alert.present()).catch(err => console.log("Alert Error:  " + err));
  }

  
   getPicture(role : boolean) {

    let pictureCollection : AngularFirestoreCollection<Student | Professor> = role ?  this.afs.collection(`/professors/`) : this.afs.collection('/students/'); 

    let options: CameraOptions = {

     // quality: 100,  // quality  of the image 
      allowEdit: true,  // alow simple editing of the image before selection 
      saveToPhotoAlbum: true,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,

    };
     // select the user doc
     let pictureRef : AngularFirestoreDocument<Student | Professor> = pictureCollection.doc(`${this.userSevice.getUID()}`); 
     // get the picture 
     this.camera.getPicture(options).then((imageData) => {
     let base64Image ='data:image/jpeg;base64,' + imageData;
     // save the image data:image on that db 
     pictureRef.update({picture: base64Image}).catch((err) => this.doAlert('Error', err, 'OK'));
   },(err) => {
     this.doAlert('Error', 'This functionality only works on Mobiles', 'Ok');
     console.log("Error ", err);
   });

   }  
}