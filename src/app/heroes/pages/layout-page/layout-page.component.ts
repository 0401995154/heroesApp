import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [],
})
export class LayoutPageComponent {
  public sidebarItem = [
    {
      label: 'Listado',
      icon: 'label',
      url: './list',
    },

    {
      label: 'Añadir',
      icon: 'add',
      url: './new-hero',
    },

    {
      label: 'Buscar',
      icon: 'search',
      url: './search',
    },
  ];
}
