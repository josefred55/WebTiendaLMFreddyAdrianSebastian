import { Routes } from '@angular/router';
import {HomeComponent} from './componentes/home/home.component';
import {ComunidadComponent} from './componentes/comunidad/comunidad.component';
import {CatalogoComponent} from './componentes/catalogo/catalogo.component';
import {HistoriaComponent} from './componentes/historia/historia.component';
import {SoporteComponent} from './componentes/soporte/soporte.component';
import {ValoresComponent} from './componentes/valores/valores.component';
import {PageNotFoundComponent} from './layout/page-not-found/page-not-found.component';
// 1. IMPORTA AQUÍ TU COMPONENTE
import { ProductoDetalleComponent } from './componentes/producto-detalle/producto-detalle.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'catalogo',
    component: CatalogoComponent
  },
  {
    path: 'producto/:id',
    component: ProductoDetalleComponent
  },
  {
    path: 'comunidad',
    component: ComunidadComponent
  },
  {
    path: 'historia',
    component: HistoriaComponent
  },
  {
    path: 'soporte',
    component: SoporteComponent
  },
  {
    path: 'valores',
    component: ValoresComponent
  },
  {
    path: '**', // EL 404 SIEMPRE AL FINAL
    component: PageNotFoundComponent,
    pathMatch: "full"
  },
];
