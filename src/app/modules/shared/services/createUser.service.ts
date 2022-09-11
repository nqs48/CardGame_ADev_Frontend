import { Injectable } from '@angular/core';
import { Firestore, collection, setDoc, CollectionReference, collectionData, doc, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { JugadorModel } from '../../game/models/jugador.model';

@Injectable({
  providedIn: 'root',
})
export class CreateUserService {
  
  private jugadoresRef: CollectionReference= collection(
    this.firestore$,
    'jugadores'
  );

  constructor(private firestore$: Firestore) {}

  addUser(jugador: JugadorModel) {
    const gamerRef = doc(this.jugadoresRef, jugador.uid || "");
    return setDoc(gamerRef, jugador);
  }

  getAllUser(): Observable<JugadorModel[]> {
    return collectionData(this.jugadoresRef) as Observable<JugadorModel[]>;
  }
}



