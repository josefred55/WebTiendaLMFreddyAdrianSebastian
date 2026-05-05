// En cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private lista: any[] = [];
  private _carrito = new BehaviorSubject<any[]>([]);
  carrito$ = this._carrito.asObservable();

  agregar(producto: any) {
    this.lista.push(producto);
    this._carrito.next(this.lista);
  }

  obtenerItems() {
    return this.lista;
  }
}
