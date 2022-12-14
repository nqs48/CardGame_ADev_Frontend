import { Injectable } from '@angular/core';
import { Firestore, collection, setDoc, CollectionReference, collectionData, doc, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { JugadorModel } from '../../../game/models/jugador.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private jugadoresRef: CollectionReference = collection(
    this.firestore$,
    'Players'
  );

  constructor(private firestore$: Firestore) {}

  addGamer(jugador: JugadorModel) {
    const gamerRef = doc(this.jugadoresRef, jugador.uid || '');
    return setDoc(gamerRef, jugador);
  }

  getAllGamers(): Observable<JugadorModel[]> {
    return collectionData(this.jugadoresRef) as Observable<JugadorModel[]>;
  }

  getPlayer(lista: any) {
    lista.forEach((element: any) => {});
  }

  // setUserPuntos(userId: string, puntos: number) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //     `users/${userId}`
  //   );
  //   console.log(puntos);
  //   console.log(this.puntaje);
  //   userRef.update({ puntos: this.puntaje + puntos });
  // }
}



