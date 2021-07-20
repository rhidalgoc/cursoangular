import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresApi } from 'src/app/utilidades/utilidades';
import { generoCreacionDTO } from '../genero';
import { GeneroService } from '../genero.service';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css']
})
export class CrearGeneroComponent {

  errores:string[] = [];

  constructor(private router:Router, private generoService:GeneroService) { }

  guardarCambios(genero:generoCreacionDTO){
    this.generoService.Crear(genero).subscribe(() => {
      this.router.navigate(['/generos']);
    }, error => this.errores = parsearErroresApi(error)
    );
  }
}
