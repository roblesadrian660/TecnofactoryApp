import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../../interfaces/comics.interface';
import { ComicsService } from '../../services/comics.service';

@Component({
  selector: 'app-comic-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class ComicCardComponent implements OnInit {
  @Input()
  public comic!: Result;
 
  constructor(private comicsService: ComicsService,) { }


  ngOnInit(): void {
    if (!this.comic) throw Error('Hero property is required');
  }

  toggleFavorite() {
    if (this.isFavorite()) {
      this.comicsService.removeFavorite(this.comic.id);
    } else {
      this.comicsService.addFavorite(this.comic);
    }
  }

  isFavorite(): boolean {
    return this.comicsService.isFavorite(this.comic.id);
  }

}
