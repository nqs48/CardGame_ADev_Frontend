import { Injectable } from '@angular/core';
import { Firestore, collection, setDoc, CollectionReference, collectionData, doc, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { JugadorModel } from '../../../game/models/jugador.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  private jugadoresRef: CollectionReference= collection(
    this.firestore$,
    'Players'
  );

  constructor(private firestore$: Firestore) {}

  addGamer(jugador: JugadorModel) {
    const gamerRef = doc(this.jugadoresRef, jugador.uid || "");
    return setDoc(gamerRef, jugador);
  }

  getAllGamers(): Observable<JugadorModel[]> {
    return collectionData(this.jugadoresRef) as Observable<JugadorModel[]>;
  }

}



