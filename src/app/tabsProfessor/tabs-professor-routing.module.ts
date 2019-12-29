import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsProfessorPage } from './tabs-professor.page';

const routes: Routes = [

  {path: '',  component: TabsProfessorPage,  children : [


    {
      path: 'qualities',
      loadChildren: () => import('./qualities/qualities.module').then( m => m.QualitiesPageModule)
    },


    {
      path: 'stars',
      loadChildren: () => import('./stars/stars.module').then( m => m.StarsPageModule)
    },  
  
 
  {
    path: 'stats',
    loadChildren: () => import('./stats/stats.module').then( m => m.StatsPageModule)
  },


  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  }, 
  
  
  {
    path:'', 
    redirectTo: '/tabsProfessor/qualities',
    pathMatch: 'full'
  }
    ]}, {
      path:'**', redirectTo: '/tabsProfessor/qualities', pathMatch: 'full'
    },   
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsProfessorPageRoutingModule {}
