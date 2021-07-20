import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private fb:FormBuilder, private location:Location, private activatedRoute: ActivatedRoute) { }

  form:FormGroup;

   /* En un futurio vendrá de una BD */
  generos = [
    {id:1, nombre:'Drama'},
    {id:2,nombre:'Acción'},
    {id:3,nombre:'Comedia'}
  ];
  peliculas =[
    {titulo:'Spider', enCines:false, proximoEstrenos:true, generos:[1,2], poster:'https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UX100_CR0,0,100,148_.jpg'},
    {titulo:'Moana', enCines:true, proximoEstrenos:true, generos:[3], poster:'https://m.media-amazon.com/images/M/MV5BMjI4MzU5NTExNF5BMl5BanBnXkFtZTgwNzY1MTEwMDI@._V1_QL75_UX100_CR0,0,100,148_.jpg'},
    {titulo:'Superman', enCines:false, proximoEstrenos:false, generos:[1,3], poster:'https://m.media-amazon.com/images/M/MV5BNzY2ZDQ2MTctYzlhOC00MWJhLTgxMmItMDgzNDQwMDdhOWI2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_QL75_UX100_CR0,1,100,148_.jpg'}
  ]

  peliculasOriginal = this.peliculas;
  formularioOriginal = {
    titulo:'',
    generoId:0,
    proximoEstrenos:false,
    enCines:false
  }

  ngOnInit(): void {
    this.form = this.fb.group(this.formularioOriginal);
    this.leerValoresURL();
    this.buscarPeliculas(this.form.value);

    this.form.valueChanges.subscribe(valores => {
      this.peliculas = this.peliculasOriginal;
      this.buscarPeliculas(valores);
      this.escribirParametrosBusquedaEnUrl();
    });
  }

  private leerValoresURL(){
    this.activatedRoute.queryParams.subscribe((params) => {
      var objeto: any = {};

      if(params.titulo){
        objeto.titulo = params.titulo;
      }

      if(params.generoId){
        objeto.generoId = Number(params.generoId);
      }

      if(params.proximoEstrenos){
        objeto.proximoEstrenos = params.proximoEstrenos;
      }

      if(params.enCines){
        objeto.enCines = params.enCines;
      }

      this.form.patchValue(objeto);
    })
  }

  private escribirParametrosBusquedaEnUrl(){
    var queryString = [];
    var valoresFormulario = this.form.value;

    if(valoresFormulario.titulo){
      queryString.push(`titulo=${valoresFormulario.titulo}`);
    }

    if(valoresFormulario.generoId != '0'){
      queryString.push(`generoId=${valoresFormulario.generoId}`);
    }

    if(valoresFormulario.proximoEstrenos){
      queryString.push(`proximoEstrenos=${valoresFormulario.proximoEstrenos}`);
    }

    if(valoresFormulario.enCines){
      queryString.push(`enCines=${valoresFormulario.enCines}`);
    }

    this.location.replaceState('peliculas/buscar', queryString.join('&'));
  }

  limpiar():void {
    this.form.patchValue(this.formularioOriginal);
  }

  buscarPeliculas(valores:any){
    if(valores.titulo){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.indexOf(valores.titulo) !== -1);
    }

    if(valores.generoId !== 0){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(valores.generoId) !== -1);
    }

    if(valores.proximoEstrenos){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.proximoEstrenos);
    }

    if(valores.enCines){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.enCines);
    }

  }

}
