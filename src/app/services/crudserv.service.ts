import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app'; // GROSSE GALERE 
import { Perf } from '../models/perf';
@Injectable({
  providedIn: 'root'
})
export class CrudservService {

  collek= 'performances';
  constructor(
    private afs: AngularFirestore
  ) { }
////////////////////////////////////////////////////////////////////
  creer(user:any){
    return this.afs.collection(this.collek).doc(user.uid).set({
      'email':user.email,
      'totalSets':0,
      'record10s':0,
      'record5s':0,
      'record3m':0,
      'inscrD': Date.now(), 
      'recordD':0
    });
  }
  ///////////////////////////////////////////////////////////////////
  getId(id:any){
    return this.afs.doc(`${this.collek}/${id}`).valueChanges() as Observable<Perf>;
  }
  //////////////////////////////////////////////////////////////////////
  enregistrer(x:any){
    return this.afs.collection(this.collek).doc(x.id).update({
    totalSets: x.totalSets,
    record5s: x.record5s ,
    record10s: x.record10s , 
    record3m: x.record3m,
    recordD: x.recordD 
    });
  }
  ///////////////////////////////////////////////////////////////////////
  majNiveau(x:any){
    return this.afs.collection(this.collek).doc(x.id).update({
      niveau: x.niveau
    })
  }
  //--------------
  majTheme(x:any){
    return this.afs.collection(this.collek).doc(x.id).update({
      theme: x.theme
    })
  }
  //--------------
  majMode(x:any){
    return this.afs.collection(this.collek).doc(x.id).update({
      mode: x.mode
    })
  }
  //--------------
}
