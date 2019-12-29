import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback/feedback.service';
import { Quality } from '../models/quality';

@Component({
  selector: 'app-quality-details',
  templateUrl: './quality-details.page.html',
  styleUrls: ['./quality-details.page.scss'],
})
export class QualityDetailsPage implements OnInit {


  quality: Quality; 

  constructor(private feedBack:FeedbackService) { }
  
  
  ngOnInit() {
    this.quality = this.feedBack.selectedQuality; 
    console.log(this.quality);
    
  }

}
