import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

import { environments } from '../../../environments/environments';
import { Comic, Result } from '../interfaces/comics.interface';

@Injectable({ providedIn: 'root' })

export class ComicsService {

  private baseUrl: string = environments.urlServicio;
  private favorites: Result[] = [];

  constructor(private http: HttpClient) {
    this.loadFavorites();
  }

  //Peticiones
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  getComics(): Observable<Comic> {
    return this.http.get<Comic>(`${this.baseUrl}/Marvel`, { headers: this.getHeaders() });
  }
  getComicById(id: string): Observable<Comic | undefined> {
    return this.http.get<Comic>(`${this.baseUrl}/Marvel/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => of(undefined))
      );
  }

  //Favoritos
  addFavorite(comic: Result) {
    if (!this.favorites.some(fav => fav.id === comic.id)) {
      this.favorites.push(comic);
      this.saveFavorites();
    }
  }
  removeFavorite(comicId: number) {
    this.favorites = this.favorites.filter(fav => fav.id !== comicId);
    this.saveFavorites();
  }

  getFavorites() {
    return this.favorites;
  }

  isFavorite(comicId: number): boolean {
    return this.favorites.some(fav => fav.id === comicId);
  }


  //localStorage
  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(Array.from(this.favorites)));
  }
  private loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

}
