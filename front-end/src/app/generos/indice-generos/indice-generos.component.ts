import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { generoDTO } from '../genero';
import { GeneroService } from '../genero.service';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css']
})
export class IndiceGenerosComponent implements OnInit {
  
  constructor(private generoService: GeneroService) { }
  
  generos: generoDTO[];
  columnasAMostrar = ['id', 'nombre', 'acciones'];
  cantidadTotalRegistros;
  paginaActual=1;
  cantidadRegistrosAMostrar = 10;



  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina:Number, cantidadRegistrosAMostrar){
    this.generoService.obtenerTodos(pagina, cantidadRegistrosAMostrar).subscribe( (respuesta: HttpResponse<generoDTO[]>) => {
      this.generos = respuesta.body;
      console.log(respuesta.headers.get("cantidadTotalRegistros"));
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
    }, error => console.error(error));
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar); 
  }

  borrar(id:number){
    this.generoService.borrar(id).subscribe(() =>{
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }, error => console.error(error));
  }
}
