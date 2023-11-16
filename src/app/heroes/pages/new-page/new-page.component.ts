import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/heroes';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, pipe, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [],
})
export class NewPageComponent implements OnInit {
  //Formulario reactivo
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publisher = [
    { id: 'DC Comics', value: 'DC - Comics' },
    { id: 'Marvel Comics', value: 'Marvel - Comics' },
  ];
  //snackbar un servicio que viene con angular material y tenemos que hacer la inyeccion de dependencias
  constructor(
    private service: HeroesService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.activeRouter.params
      .pipe(switchMap(({ id }) => this.service.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) {
          return this.router.navigateByUrl('/');
        }
        this.heroForm.reset(hero);
        return;
      });
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }
  onSubmit() {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.service.updateHero(this.currentHero).subscribe((hero) => {
        //mostrar snakbar
        this.showSnakBar(`${hero.superhero} actualizado`)
      });
      return;
    }

    this.service.addHero(this.currentHero).subscribe((hero) => {
      //mostrar snakbar y redirigir a la página
      this.router.navigate(['/heroes/edit',hero.id])
      this.showSnakBar(`${hero.superhero} creado!`)
    });
  }

  showSnakBar(message: string) {
    this.snackBar.open(message,'donde',{
      duration:2500
    });
  }
}
