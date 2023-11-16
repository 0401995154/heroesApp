import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/heroes';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'environments/environments';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  public heroes: Hero[] = [];
  private urlBase: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  showHeroe(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.urlBase}/heroes`);
  }

  //catch error siempre regresa un obserbable of
  //traeme la info mediante el id
  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http
      .get<Hero>(`${this.urlBase}/heroes/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  //autocomplete
  getSuggestion(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.urlBase}/heroes?q=${query}&_limit=6`);
  }
}
