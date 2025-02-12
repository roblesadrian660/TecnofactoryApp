import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { ComicsRoutingModule } from './comics-routing.module';
import { ComicCardComponent } from './components/card/card.component';
import { ComicLayoutPageComponent } from './pages/layout-page/layout-page.component'
import { ComicListPageComponent } from './pages/list-page/list-page.component';
import { ComicPageComponent } from './pages/comic-page/comic-page.component'
import { ComicFavoritesComponent } from './pages/comic-favorites/comic-favorites.component';

@NgModule({
  declarations: [
    ComicLayoutPageComponent,
    ComicListPageComponent,
    ComicCardComponent,
    ComicPageComponent,
    ComicFavoritesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ComicsRoutingModule
  ]
})
export class ComicsModule { }
