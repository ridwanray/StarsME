import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsProfessorPageRoutingModule } from './tabs-professor-routing.module';

import { TabsProfessorPage } from './tabs-professor.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsProfessorPageRoutingModule
  ],
  declarations: [TabsProfessorPage]
})
export class TabsProfesssorPageModule {}
