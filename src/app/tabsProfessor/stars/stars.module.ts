import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StarsPageRoutingModule } from './stars-routing.module';

import { StarsPage } from './stars.page';
import { StarRatingModule } from 'ionic4-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarsPageRoutingModule,
    StarRatingModule
  ],
  declarations: [StarsPage]
})
export class StarsPageModule {}
