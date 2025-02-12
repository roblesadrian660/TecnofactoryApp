import { Component, OnInit } from '@angular/core';
import { Result } from '../../interfaces/comics.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicsService } from '../../services/comics.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-comic-page',
  templateUrl: './comic-page.component.html',
  styleUrls: ['./comic-page.component.css']
})
export class ComicPageComponent implements OnInit  {

  public comic!: Result;

  constructor(
    private comicsService: ComicsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.comicsService.getComicById(id)),
      )
      .subscribe(response => {
        if (!response) return this.router.navigate(['/comics/list']);
        this.comic = response.data.results[0];
        return;
      })
  }

  goBack(): void {
    this.router.navigateByUrl('comics/list')
  }

  getCreators(): string {
    return this.comic?.creators?.items?.map(c => c.name).join(', ') || 'No disponible';
  }

}
