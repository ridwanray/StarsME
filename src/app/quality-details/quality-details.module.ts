import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QualityDetailsPageRoutingModule } from './quality-details-routing.module';

import { QualityDetailsPage } from './quality-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QualityDetailsPageRoutingModule
  ],
  declarations: [QualityDetailsPage]
})
export class QualityDetailsPageModule {}
