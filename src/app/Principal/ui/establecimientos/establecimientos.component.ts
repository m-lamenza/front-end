import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSfeIconsComponent } from 'src/libs/components/app-sfe-icons/app-sfe-icons.component';

interface Establecimiento {
  id: number;
  nombre: string;
  tipo: string;
  direccion: string;
  telefono: string;
  email: string;
  estado: 'activo' | 'inactivo';
  imagen?: string;
  subtitulo: string;
}

@Component({
  selector: 'app-establecimientos',
  standalone: true,
  imports: [CommonModule, AppSfeIconsComponent],
  templateUrl: './establecimientos.component.html',
  styleUrls: ['./establecimientos.component.scss']
})
export class EstablecimientosComponent implements OnInit {
  
  establecimientos: Establecimiento[] = [
    {
      id: 1,
      nombre: 'Escuela Primaria N° 123',
      tipo: 'Primaria',
      direccion: 'Av. San Martín 456, Santa Fe',
      telefono: '0342-4567890',
      email: 'escuela123@santafe.edu.ar',
      estado: 'activo',
      imagen: 'assets/images/school-1.svg',
      subtitulo: 'General José de San Martín'
    },
    {
      id: 2,
      nombre: 'Colegio Secundario N° 45',
      tipo: 'Secundaria',
      direccion: 'Belgrano 789, Rosario',
      telefono: '0341-1234567',
      email: 'colegio45@santafe.edu.ar',
      estado: 'activo',
      imagen: 'assets/images/school-2.svg',
      subtitulo: 'Liceo Avellaneda'
    },
  ];

  constructor() {}

  ngOnInit() {
    console.log('Establecimientos cargados:', this.establecimientos.length);
  }

  agregarEstablecimiento() {
    console.log('Agregar establecimiento');
    // Implementar lógica para agregar
  }

  verEstablecimiento(id: number) {
    console.log('Ver establecimiento:', id);
    // Implementar navegación a detalle
  }

  editarEstablecimiento(id: number, event: Event) {
    event.stopPropagation();
    console.log('Editar establecimiento:', id);
    // Implementar lógica para editar
  }

  eliminarEstablecimiento(id: number, event: Event) {
    event.stopPropagation();
    console.log('Eliminar establecimiento:', id);
    // Implementar lógica para eliminar
  }
} 