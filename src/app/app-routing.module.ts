import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'detailpopup',
    loadChildren: () => import('./detailpopup/detailpopup/detailpopup.module').then( m => m.DetailpopupPageModule)
  },
  {
    path: 'detailspecial',
    loadChildren: () => import('./detailspecial/detailspecial.module').then( m => m.DetailspecialPageModule)
  },
  {
    path: 'categoryselector',
    loadChildren: () => import('./categoryselector/categoryselector.module').then( m => m.CategoryselectorPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
