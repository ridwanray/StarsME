import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfessorsPage } from './professors.page';

const routes: Routes = [
  {
    path: '',
    component: ProfessorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessorsPageRoutingModule {}
