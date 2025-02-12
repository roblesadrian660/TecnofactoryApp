import { Component, OnInit } from '@angular/core';

import { Result } from '../../interfaces/comics.interface';
import { ComicsService } from '../../services/comics.service';


@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ComicListPageComponent implements OnInit {

  public comics: Result[] = [];
  constructor(private comicsService: ComicsService) {
    this.comics = null!;
  }

  ngOnInit(): void {
    this.comicsService.getComics()
      .subscribe(response => this.comics = response.data.results );
  }
}
