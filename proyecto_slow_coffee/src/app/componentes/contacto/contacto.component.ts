// contacto.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  nombre = '';
  email = '';
  telefono = '';
  asunto = '';
  mensaje = '';enviado = false;

  onSubmit() {
    if (this.nombre && this.email && this.mensaje) {
      console.log('Mensaje enviado:', { nombre: this.nombre, email: this.email, mensaje: this.mensaje });
      this.enviado = true;
      setTimeout(() => this.resetForm(), 3000);
    }
  }

  resetForm() {
    this.nombre = '';
    this.email = '';
    this.telefono = '';
    this.asunto = '';
    this.mensaje = '';
    this.enviado = false;
  }
}
