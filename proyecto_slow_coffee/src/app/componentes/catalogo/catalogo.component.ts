import { Component, OnInit, inject } from '@angular/core'; // Añadimos inject
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroComponent } from '../../layout/hero/hero.component';
import { ProductCardComponent } from '../../layout/product-card/product-card.component';
import { Product } from '../../interfaces/producto'; // Importamos la interfaz externa
import { ProductService } from '../../servicios/product.service'; // Importamos el servicio

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, HeroComponent, ProductCardComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
  // --- Inyección del servicio ---
  private productService = inject(ProductService);

  // --- Datos ---
  protected origins = ['Etiopía', 'Colombia', 'Brasil', 'Kenya'];
  protected processes = ['Lavado', 'Natural', 'Honey'];
  protected noteMap: Record<string, string[]> = {
    'Etiopía':  ['Frutos Rojos y Cítricos', 'Floral y Bergamota', 'Bayas y Chocolate'],
    'Colombia': ['Caramelo y Nueces', 'Naranja y Miel', 'Chocolate y Ciruela'],
    'Brasil':   ['Chocolate y Avellana', 'Nuez y Especias', 'Caramel y Azúcar'],
    'Kenya':    ['Limón y Grosella', 'Frambuesa y Menta', 'Tropical y Cítrico']
  };
  protected badgeTypes = ['Orgánico', 'Premium', 'Comercio Justo'];

  // --- Estado ---
  products: Product[] = [];
  filteredProducts: Product[] = [];

  // --- Filtros ---
  searchTerm = '';
  selectedOrigins: string[] = [];
  selectedBadges: string[] = [];
  sortValue = '';

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        // Imprimimos en consola lo que llega para ver qué está pasando realmente
        console.log('Datos recibidos del JSON:', data);

        // Verificamos si la data existe y es un arreglo. Si es nula, usamos un arreglo vacío []
        this.products = data || [];
        this.filteredProducts = [...this.products];
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        // Si hay error, inicializamos vacíos para no romper la vista
        this.products = [];
        this.filteredProducts = [];
      }
    });
  }

  // ... (Tus métodos toggleFilter, isChecked y applyFilters se quedan igual)
  // ... (Ya que funcionan con el arreglo de productos que ahora viene del JSON)

  toggleFilter(list: string[], value: string) {
    const idx = list.indexOf(value);
    idx === -1 ? list.push(value) : list.splice(idx, 1);
    this.applyFilters(); // Te sugiero llamar a applyFilters aquí para que sea instantáneo
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

    this.filteredProducts = filtered;
  }
}
