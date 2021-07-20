import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {

  constructor() { }

  @Input() contenidoMarkdown = '';

  contenidoMarkDown:string = 'Texto';

  @Input() placeHolderTextarea:string;

  @Output() changeMarkdown:EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
  }

  OnChangeMarkdown(evento):void{
    const texto = evento.target.value;
    this.contenidoMarkdown = texto;
    this.changeMarkdown.emit(texto);
   
  }

/*   inputTextArea(evento):void{
    const texto = evento.target.value;
    this.contenidoMarkDown = texto;
    this.changeMarkdown.emit(texto);
    //console.log(texto);
  } */
}
