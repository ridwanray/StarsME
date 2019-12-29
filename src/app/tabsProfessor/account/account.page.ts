import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { UtilService } from 'src/app/services/util/util.service';
import { Professor } from 'src/app/models/professor';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  public user : Professor = new Professor(); 

  constructor(private userService: UserService, public utilService: UtilService) {
    this.utilService.doLoading('Please Wait...');
    this.userService.getUser('professors').valueChanges().subscribe((professor : Professor) => {
      this.user = professor; 
    }); 

   }

  showSettings(event : Event) {
     // console.log('Event', event)
     this.utilService.doPopover(event, this.user, true); 
  }

  ngOnInit() {
    
  }

}
