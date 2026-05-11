import { Component } from '@angular/core';
import {HeroComponent} from '../../layout/hero/hero.component';
import {ProductCardComponent} from '../product-card/product-card.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    ProductCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
