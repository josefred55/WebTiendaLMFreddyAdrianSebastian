import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Input() textoBoton: string = '';
  @Input() botonUrl: string = '';
  @Input() imgUrl: string = '';
  @Input() posicion: 'start' | 'center' | 'end' = 'center';
}
