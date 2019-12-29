import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Storage } from '@ionic/storage';
import { UtilService } from '../services/util/util.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { Professor } from '../models/professor';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm : FormGroup; 

  constructor(
    private auth : AuthService,
    private uitil : UtilService,
    private fb : FormBuilder,
    private storage: Storage,
    private userService : UserService, 
    private router: Router,
    ) { 

     }

  createFrom() : void {
    this.loginForm = this.fb.group({
      email : ['', Validators.compose([Validators.required, Validators.email])],
      password : ['', Validators.required]
    }); 
  } 
  
  
  siginWithGoogle() : void {

     this.auth.siginWithGoogle().then((user: firebase.auth.UserCredential) => {
      this.userService.createUserWithProvider(user);
      this.router.navigateByUrl('/tabsStudent'); 
    }).catch((err) => {
       console.error(err);
       this.uitil.doAlert('Google', err, 'OK'); 
    });
  }
   
  siginWithFacebook() : void  {
      this.auth.siginWithFacebook().then((user: firebase.auth.UserCredential) => { 
      this.userService.createUserWithProvider(user);
      this.router.navigateByUrl('/tabsStudent'); 
    }).catch((err) => {
       console.error(err);
       this.uitil.doAlert('Facebook', err, 'OK'); 
    });
  }

  sigin() : void {
    console.log('form', this.loginForm.value);
    this.auth.sigin(this.loginForm.value).then(data => {
      console.log('uid sigin: ', JSON.stringify(data.user.uid));
      this.storage.set('uid', JSON.stringify(data.user.uid));
      this.userService.getUser('professors').get().subscribe((docSnapshot : DocumentSnapshot<Professor>) => {
        if(docSnapshot.exists) {
          this.storage.set('role', true); 
          this.router.navigateByUrl('/tabsProfessor');
        } else {
          this.uitil.doToast('Welcome', data.user.email); 
          this.router.navigateByUrl('/tabsStudent');
        } 
      });    
    },(reason) => {
      this.uitil.doAlert("Error", reason, "Ok");
      this.router.navigateByUrl('/login');
    });
  }

  ngOnInit() {
    this.createFrom();
  }

}