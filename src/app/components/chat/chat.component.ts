import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  mensaje: string = '';
  cajaMensajesElement: any;


  constructor(public cs$: ChatService ) {
    this.cs$.cargarMensajes().subscribe( () => {
      setTimeout(() => {
        this.cajaMensajesElement.scrollTop = this.cajaMensajesElement.scrollHeight;
      }, 20);
    });
  }

  ngOnInit(): void {
    this.cajaMensajesElement = document.getElementById('app-mensajes');
  }


  enviarMensaje(){

    if( this.mensaje.trim().length === 0) return;

    this.cs$.agregarMensaje( this.mensaje)
        .then( () => this.mensaje = null)
        .catch( httpError => console.log('Error al enviar el mensaje', httpError));

  }

}
