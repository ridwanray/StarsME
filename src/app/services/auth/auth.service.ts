import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/models/user';
import { auth } from 'firebase';
import { Platform } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx'; 
import { GooglePlus } from '@ionic-native/google-plus/ngx'; 
import * as firebase from 'firebase';

@Injectable()

export class AuthService {


  // to store the role of the user
  public role : boolean = false;  
  constructor(private afAuth: AngularFireAuth, private platfrom : Platform, private fb: Facebook, private googlePlus: GooglePlus) {}

   async siginWithGoogle()   {

    if(this.platfrom.is('cordova'))  {

      const user = await this.googlePlus.login({
        'scopes': '',
        'webClientId': '423876000658-io6g5hqnghtv8u6dmr8rku8uf803l7uf.apps.googleusercontent.com',
        'offline': true // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server    
      });
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
      return this.afAuth.auth.signInWithCredential(googleCredential); 

       } else{
        return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } 
  }

  // using facebook 
  async siginWithFacebook() : Promise<firebase.auth.UserCredential> {
    // 'mobile'
    if(this.platfrom.is('cordova')) {
      const res : FacebookLoginResponse = await this.fb.login(['email']);
      const facebookCredentail: auth.OAuthCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      return this.afAuth.auth.signInWithCredential(facebookCredentail);
    } else {
        return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    }
  }

   getAuth () : firebase.auth.Auth {
      return this.afAuth.auth; 
   }

  // get the current User Id
    getCurrentUserUid() : string {
    return this.afAuth.auth.currentUser.uid;
  } 
   
  // log in 
   sigin(user: User) : Promise<firebase.auth.UserCredential>  {
     return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
   }



   

  // register
     createAccount(user: User) : Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password); 
   }

  // logout 
     logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
  
  }