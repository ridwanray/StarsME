import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Student } from 'src/app/models/student';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  public user : Student = new Student(); 

  constructor(private userService: UserService, public utilService: UtilService) {
    this.utilService.doLoading('Please Wait...');
    this.userService.getUser('students').valueChanges().subscribe((student : Student) => {
      this.user = student; 
    }); 

   }

  showSettings(event : Event) : void {
     // console.log('Event', event)
     this.utilService.doPopover(event, this.user); 
  }

  ngOnInit() {
    
  }

}
