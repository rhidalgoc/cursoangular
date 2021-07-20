import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresApi } from 'src/app/utilidades/utilidades';
import { generoCreacionDTO, generoDTO } from '../genero';
import { GeneroService } from '../genero.service';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent implements OnInit {

  modelo:generoDTO;
  errores:string[] = [];
  
  constructor(private route: Router, 
    private generoservice:GeneroService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
       this.generoservice.obtenerPorId(params.id)
       .subscribe(genero => {
         this.modelo = genero;
       }, () => this.route.navigate(['/generos']));
    });
  }

  guardarCambios(genero:generoCreacionDTO){
      this.generoservice.editar(this.modelo.id, genero).subscribe(() => {
      this.route.navigate(['/generos']);
}, error => this.errores = parsearErroresApi(error));
}
}
