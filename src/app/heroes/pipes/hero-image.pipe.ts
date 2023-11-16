import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/heroes';

@Pipe({
  name: 'heroImage',
})
export class HeroImagePipe implements PipeTransform {
  //En el pipe podemos recibir cualquier propiedad que necesitemos transformar

  transform(hero: Hero): string {
    //si el hero id no existe
    if (!hero.id && !hero.alt_img) {
      return 'assets/no-image.png';
    }

    if (hero.alt_img) return hero.alt_img;

    return `assets/heroes/${hero.id}.jpg`;
  }
}
