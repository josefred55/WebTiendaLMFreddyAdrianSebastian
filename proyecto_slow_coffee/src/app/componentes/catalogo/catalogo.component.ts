import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // 1. Importamos el Router
import { ProductCardComponent } from '../../layout/product-card/product-card.component';
import { CartService } from '../../servicios/cart.service';

interface Product {
  id: number;
  name: string;
  origin: string;
  process: string;
  note: string;
  badge: string;
  price: number;
  img: string;
}

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private cartService = inject(CartService);
  private router = inject(Router); // 2. Inyectamos el Router

  products: Product[] = [];
  filteredProducts: Product[] = [];

  searchTerm = '';
  selectedOrigins: string[] = [];
  selectedBadges: string[] = [];
  sortValue = '';

  origins = ['Etiopía', 'Colombia', 'Brasil', 'Kenya'];
  badgeTypes = ['Orgánico', 'Premium', 'Comercio Justo'];

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.http.get<Product[]>('/assets/data/productos.json').subscribe({
      next: (data) => {
        this.products = [...data];
        this.filteredProducts = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  // Lógica del Carrito con Redirección
  agregarAlCarrito(producto: Product) {
    // 1. Agregamos al servicio (se guarda en la lista)
    this.cartService.agregar(producto);

    // 2. Avisamos por consola (para debug)
    console.log('Añadido al acumulado:', producto.name);

    // 3. Redirigimos al componente donde se ve la lista acumulada
    // Esto es lo que querías: que te lleve a la página donde se ven todos los guardados
    this.router.navigate(['/checkout']);
  }

  // --- Lógica de Filtros ---
  toggleFilter(list: string[], value: string) {
    const idx = list.indexOf(value);
    idx === -1 ? list.push(value) : list.splice(idx, 1);
  }

  isChecked(list: string[], value: string): boolean {
    return list.includes(value);
  }

  applyFilters() {
    const term = this.searchTerm.toLowerCase();
    let filtered = this.products.filter(p => {
      const matchSearch = !term || p.name.toLowerCase().includes(term) || p.note.toLowerCase().includes(term);
      const matchOrigin = !this.selectedOrigins.length || this.selectedOrigins.includes(p.origin);
      const matchBadge  = !this.selectedBadges.length  || this.selectedBadges.includes(p.badge);
      return matchSearch && matchOrigin && matchBadge;
    });

    if (this.sortValue === 'price-asc')  filtered.sort((a, b) => a.price - b.price);
    if (this.sortValue === 'price-desc') filtered.sort((a, b) => b.price - a.price);

    this.filteredProducts = [...filtered];
    this.cdr.detectChanges();
  }
}
