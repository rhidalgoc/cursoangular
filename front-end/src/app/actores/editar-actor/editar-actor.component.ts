import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresApi } from 'src/app/utilidades/utilidades';
import { actorCreacionDTO, actorDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  modelo:actorDTO;
  errores:string[] = [];
  
  constructor(private route: Router, 
    private actorService:ActoresService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
       this.actorService.obtenerPorId(params.id)
       .subscribe(actor => {
         this.modelo = actor;
       }, () => this.route.navigate(['/actores']));
    });
  }

  guardarCambios(actor:actorCreacionDTO){
      this.actorService.editar(this.modelo.id, actor)
      .subscribe(() => {
      this.route.navigate(['/actores']);
      }, error => this.errores = parsearErroresApi(error)); 
  }
}
