import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [
    RouterLink
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() etiqueta: string = '';
  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() precio: string = '';
  @Input() textoBoton: string = '';
  @Input() urlBoton: string = '';
  @Input() id: number = 0; // Añade esta línea donde están tus otros @Input


  agregarAlCarrito() {
    alert(`¡${this.titulo} se ha añadido al carrito desde el catálogo! ☕`);
  }
}
