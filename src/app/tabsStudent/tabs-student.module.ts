import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsStudentPageRoutingModule } from './tabs-student-routing.module';

import { TabsStudentPage } from './tabs-student.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsStudentPageRoutingModule
  ],
  declarations: [TabsStudentPage]
})
export class TabsStudentPageModule {}
