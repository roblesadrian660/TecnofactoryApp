import { Component } from '@angular/core';
import { ComicsService } from '../../services/comics.service';
import { Result } from '../../interfaces/comics.interface';

@Component({
  selector: 'app-comic-favorites',
  templateUrl: './comic-favorites.component.html',
  styleUrls: ['./comic-favorites.component.css']
})
export class ComicFavoritesComponent {
  public comics: Result[] = [];
  constructor(private comicsService: ComicsService) {
    this.comics = null!;
  }

  ngOnInit() {
    this.comics = this.comicsService.getFavorites();
  }
}
