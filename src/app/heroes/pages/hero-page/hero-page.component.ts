import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
//permite recopilar los parametros que se envia
import { ActivatedRoute, Route, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/heroes';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [],
})
export class HeroPageComponent implements OnInit {
  public hero?: Hero;
  constructor(
    private servicio: HeroesService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  //switch map permite tomar los params o propiedades del obj
  ngOnInit(): void {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.servicio.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigate(['/heroes/list']);
        this.hero = hero;
        return;
      });
  }
}
