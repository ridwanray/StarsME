import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QualitiesPage } from './qualities.page';

const routes: Routes = [
  {
    path: '',
    component: QualitiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QualitiesPageRoutingModule {}
