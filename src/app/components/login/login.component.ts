import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor( private cs$: ChatService ) { }

  ngOnInit(): void {
  }

  ingresar(proveedor: string){
    console.log( proveedor);

    this.cs$.login(proveedor);
  }

}
