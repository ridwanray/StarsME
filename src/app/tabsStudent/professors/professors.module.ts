import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfessorsPageRoutingModule } from './professors-routing.module';

import { ProfessorsPage } from './professors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfessorsPageRoutingModule
  ],
  declarations: [ProfessorsPage]
})
export class UsersPageModule {}
