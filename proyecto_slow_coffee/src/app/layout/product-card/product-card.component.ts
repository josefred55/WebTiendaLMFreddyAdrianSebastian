import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
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
  @Input() imgUrl: string = 'img/productosFoto.png';
}
