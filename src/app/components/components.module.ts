import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountPopoverComponent } from './account-popover/account-popover.component';
import { IonicModule } from '@ionic/angular';
import { EditProfilePageModule } from './account-popover/edit-profile/edit-profile.module';

@NgModule({
  declarations: [AccountPopoverComponent],
  imports: [
    CommonModule,
    IonicModule,   // to use ionic componenets
    EditProfilePageModule
  ],
  entryComponents: [AccountPopoverComponent]
})
export class ComponentsModule { }
