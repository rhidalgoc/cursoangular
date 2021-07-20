import { Component, OnInit } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  constructor() { }

  modelo: PeliculaDTO = {titulo:'Spider', trailer:'abc', enCines:true, resumen:'cosa', fechaLanzamiento: new Date(), 
  poster:'https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UX100_CR0,0,100,148_.jpg'}
  ngOnInit(): void {
  }

  guardarCambios(pelicula:PeliculaCreacionDTO) {
    console.log(pelicula);
  }
}
