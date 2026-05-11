import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../servicios/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private cartService = inject(CartService);
  cantidadCarrito = 0;

  links = [
    { nombre: 'Home', url: '/home' },
    { nombre: 'Catálogo', url: '/catalogo' },
    { nombre: 'Historia', url: '/historia' },
    { nombre: 'Comunidad', url: '/comunidad' },
    { nombre: 'Valores', url: '/valores' },
    { nombre: 'Soporte', url: '/soporte' },
    { nombre: 'Login', url: '/login' }
  ];

  ngOnInit() {
    this.cartService.carrito$.subscribe(productos => {
      this.cantidadCarrito = productos.length;
    });
  }
}
