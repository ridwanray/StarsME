import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { UtilService } from './util/util.service';
import { CameraService } from './camera/camera.service';
import { FeedbackService } from './feedback/feedback.service';
import { Facebook } from '@ionic-native/facebook/ngx'; 
import { GooglePlus } from '@ionic-native/google-plus/ngx'; 

import { EmailService } from './email/email.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [EmailComposer, EmailService, GooglePlus, Facebook, FeedbackService, AuthService, UserService, UtilService, CameraService]
})
export class ServicesModule { }
