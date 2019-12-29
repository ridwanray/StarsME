import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QualitiesPageRoutingModule } from './qualities-routing.module';

import { QualitiesPage } from './qualities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QualitiesPageRoutingModule
  ],
  declarations: [QualitiesPage]
})
export class QualitiesPageModule {}
