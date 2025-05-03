import { Component, OnInit } from '@angular/core';
import { BarDetailsService } from '../../services/bar-details.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-details-bar',
  imports: [
    NgForOf
  ],
  templateUrl: './details-bar.component.html',
  standalone: true,
  styleUrls: ['./details-bar.component.scss']
})
export class DetailsBarComponent implements OnInit {
  selectedCar: any; // Para almacenar la información del coche
  private id: string | undefined;
  private nombre: string | undefined;

  constructor(private barDetailsService: BarDetailsService) {}

  async ngOnInit(): Promise<void> {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('carId');
    if (carId) {
      const partes = carId.split('-');
      this.id = partes.pop();
      this.nombre = partes.join('-');

      console.log('Nombre:', this.nombre);
      console.log('ID:', this.id);

      try {
        // Obtener la información del coche
        this.selectedCar = await this.barDetailsService.getInfo(carId);

        // Verificamos que la información se haya recibido correctamente
        console.log('selectedCar:', this.selectedCar);

        // Asegurémonos de que 'info' es un array
        if (this.selectedCar && Array.isArray(this.selectedCar)) {
          console.log('Información del coche:', this.selectedCar);
        } else {
          console.warn('No se encontró el campo "info" o está vacío');
        }
      } catch (error) {
        console.error('Error al obtener los detalles del coche:', error);
      }
    }
  }
}
