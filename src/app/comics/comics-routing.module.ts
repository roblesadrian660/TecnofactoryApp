import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicLayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ComicListPageComponent } from './pages/list-page/list-page.component';
import { ComicPageComponent } from './pages/comic-page/comic-page.component';
import { ComicFavoritesComponent } from './pages/comic-favorites/comic-favorites.component';

// localhost:4200/comics
const routes: Routes = [
  {
    path: '',
    component: ComicLayoutPageComponent,
    children: [
      { path: 'list', component: ComicListPageComponent },
      { path: 'favorites', component: ComicFavoritesComponent },
      { path: ':id', component: ComicPageComponent },
      { path: '**', redirectTo: 'list' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComicsRoutingModule { }
