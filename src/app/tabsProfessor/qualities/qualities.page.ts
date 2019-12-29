import { Component, OnInit, ViewChild } from '@angular/core';
import { Quality } from 'src/app/models/quality';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { UtilService } from 'src/app/services/util/util.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IonItemSliding } from '@ionic/angular'; // to close the items 

@Component({
  selector: 'app-qualities',
  templateUrl: './qualities.page.html',
  styleUrls: ['./qualities.page.scss'],
})
export class QualitiesPage implements OnInit {

  // to close the item sliding 
  @ViewChild(IonItemSliding, {static: false}) itemSliding: IonItemSliding;

  qualities$ : Observable<Quality[]>;

  constructor(private router: Router, private feedBackServices: FeedbackService, private utilService: UtilService) { }

  closeOpened() : Promise<boolean> {
    return this.itemSliding.closeOpened();
  }


  qualityDetail(quality : Quality) : void {

    this.feedBackServices.selectedQuality = quality;
    this.router.navigateByUrl('/quality-details');
    this.closeOpened().then((ok : boolean ) => console.log(ok));  
  }

  ngOnInit() : void {
    this.utilService.doLoading('Please Wait...'); 
    this.qualities$ = this.feedBackServices.getQualites(); 
  }

}
