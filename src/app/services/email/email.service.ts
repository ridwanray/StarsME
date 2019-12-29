import { Injectable } from '@angular/core';
import { EmailComposer, EmailComposerOptions } from '@ionic-native/email-composer/ngx'; 
import { UtilService } from '../util/util.service';


@Injectable()
export class EmailService {

  constructor(private emailComposer: EmailComposer, private utilService: UtilService) { }

  async sendEmail(to: string, cc: string,  subject?: string, body?: string) : Promise<any> {
   
    let email : EmailComposerOptions  =  {
      to: to,
      cc: cc,
      subject: subject ? subject : 'Test sending email',
      body:  body ? body : '<b> this is a <em>test</em></b>',
      isHtml: true,
    }
    // verifiy if the sending email is supported in the device
    const isAvailable : boolean = await this.emailComposer.isAvailable();
    if (isAvailable) {
      return this.emailComposer.open(email);
    } else {
      this.utilService.doAlert('Email Error', 'Sending mail is not supported', 'OK');
    } 
  }



}
 