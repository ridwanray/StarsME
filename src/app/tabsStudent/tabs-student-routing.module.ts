import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsStudentPage } from './tabs-student.page';

const routes: Routes = [


  {path: '',  component: TabsStudentPage,  children : [
  
  {
    path: 'top-professors',
    loadChildren: () => import('./top-professors/top-professors.module').then( m => m.TopProfessorsPageModule)
  },
  {
    path: 'professors',
    loadChildren: () => import('./professors/professors.module').then( m => m.UsersPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  },{

    path:'', 
    redirectTo: '/tabsStudent/professors',
    pathMatch: 'full'
    
  }
 
    ]}, {
      path:'**', redirectTo: '/tabsStudent/professors', pathMatch: 'full'
    } 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsStudentPageRoutingModule {}
