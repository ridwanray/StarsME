import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopProfessorsPageRoutingModule } from './top-professors-routing.module';

import { TopProfessorsPage } from './top-professors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopProfessorsPageRoutingModule
  ],
  declarations: [TopProfessorsPage]
})
export class TopProfessorsPageModule {}
