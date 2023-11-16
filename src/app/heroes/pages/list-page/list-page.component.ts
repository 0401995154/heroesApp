import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/heroes';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [],
})
export class ListPageComponent implements OnInit {
  constructor(private heroesList: HeroesService) {}

  public heroes: Hero[] = [];

  ngOnInit(): void {
    this.heroesList.showHeroe().subscribe((data) => {
      this.heroes = data;
    });
  }
}
