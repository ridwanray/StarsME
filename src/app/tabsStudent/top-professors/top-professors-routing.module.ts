import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopProfessorsPage } from './top-professors.page';

const routes: Routes = [
  {
    path: '',
    component: TopProfessorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopProfessorsPageRoutingModule {}
