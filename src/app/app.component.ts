import { Component } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatService } from './providers/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  /*
  // Pruebas

  public chats: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.chats = firestore.collection('chats').valueChanges();
  }

*/
  constructor( public cs$: ChatService) {}


}
