import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresApi } from 'src/app/utilidades/utilidades';
import { cineCreacionDTO, cineDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  modelo:cineDTO;
  errores:string[] = [];
  
  constructor(private route: Router, 
    private cinesService:CinesService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
       this.cinesService.obtenerPorId(params.id)
       .subscribe(cine => {
         this.modelo = cine;
       }, () => this.route.navigate(['/generos']));
    });
  }

  guardarCambios(cine:cineCreacionDTO){
      this.cinesService.editar(this.modelo.id, cine).subscribe(() => {
      this.route.navigate(['/cines']);
}, error => this.errores = parsearErroresApi(error));
}
}
