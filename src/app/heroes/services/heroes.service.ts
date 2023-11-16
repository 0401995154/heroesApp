import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/heroes';
import { Observable, catchError, map, of } from 'rxjs';
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

  //catch error siempre regresa un observable of
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

  //end points para CRUD

  //Crear Hero
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.urlBase}/heroes`, hero);
  }
  //Actualizar sin destruir
  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error('Hero id no required');
    return this.http.patch<Hero>(`${this.urlBase}/heroes/${hero.id}`, hero);
  }
  //Eliminar
  //map transforma la información al igual que el pipe los dos devuelven observables
  deleteHero(id: string): Observable<boolean> {
    return this.http.delete(`${this.urlBase}/heroes/${id}`).pipe(
      catchError((err) => of(false)),
      map((resp) => true)
    );
  }
}
