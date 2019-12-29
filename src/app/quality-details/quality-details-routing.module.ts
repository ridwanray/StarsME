import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QualityDetailsPage } from './quality-details.page';

const routes: Routes = [
  {
    path: '',
    component: QualityDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QualityDetailsPageRoutingModule {}
