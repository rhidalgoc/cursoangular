import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDTO, actorDTO } from '../actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit {

  @Output() OnSubmitt: EventEmitter<actorCreacionDTO> = new EventEmitter<actorCreacionDTO>();
  @Input() modelo:actorDTO;
  form:FormGroup;

  @Input() errores: string[] = [];

  imagenCambiada = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre:['', {validators:[Validators.required]}],
      fechaNacimiento:'',
      foto:'',
      biografia:''
    });

    if(this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }

  OnSubmit(){
    if(!this.imagenCambiada){
      this.form.patchValue({'foto': null});
    }
    this.OnSubmitt.emit(this.form.value);
  }

  archivoSeleccionado(file){
    this.imagenCambiada = true;
    this.form.get('foto').setValue(file);
  }

  cambioMarkdown(texto:string){
    this.form.get('biografia').setValue(texto);
  }
}
