import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { Mensaje } from '../interfaces/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chats: Mensaje[] = [];
  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  usuario: any = {};

  constructor(private afs: AngularFirestore,
              public auth: AngularFireAuth) {

      // Nos suscribimos al estado de la utenticacion
      this.auth.authState.subscribe((usuarioAutenticado) => {

        if(!usuarioAutenticado) return;

        /*
        Cuando el usuario esta autenticado podemos acceder a la informacion basica\
        de cada usuario
        - photoURL
        - email
        */
        console.log(usuarioAutenticado);
        this.usuario.nombre = usuarioAutenticado.displayName;
        this.usuario.uid = usuarioAutenticado.uid;

      });

}


/*

Autenticacion
Para hibilitar con Google, si no se hace falla la autenticacion
  Firebase
    Authentication
      Sing-in Method
        Habilitar Google
        Habilitar Twitter -> Seguir los pasos para obtener KEY API, SECRET API y el
                              Callback que piede la configuracio de Twitter Firebase lo ofrece
                              en la parte inferior donde se habilita Twitter, ejemplo
                              https://firechat-90e0d.firebaseapp.com/__/auth/handler
*/
login( proveedor: string ) {

  if(proveedor === 'google'){
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }else{
    this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }
}


logout() {
  this.usuario = {};
  this.auth.signOut();
}


  cargarMensajes() {
    /*
    Enviar un query a firebase
    Después del nombre de la coleccion, como segundo parametro obtenla referencia
    */

    this.itemsCollection = this.afs.collection<Mensaje>('chats', (ref) => {
                                                                       return ref.orderBy('fecha','desc').limit(15)
                                                                      });
    return this.itemsCollection.valueChanges()
            .pipe( map ((chats: Mensaje[]) => {
              this.chats = chats.reverse();
              return chats;
            }));

  }

  agregarMensaje( mensaje: string ){

    let nuevoMensaje: Mensaje = {
      mensaje,
      fecha: new Date().getTime(),
      nombre: this.usuario.nombre,
      uid: this.usuario.uid
    }

    // Retorna una promensa
    return this.itemsCollection.add(nuevoMensaje);
  }






}
