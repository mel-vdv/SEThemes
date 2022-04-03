import { Injectable} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app'; // GROSSE GALERE 
import { Perf } from '../models/perf';
@Injectable({
  providedIn: 'root'
})
export class CrudservService {

  constructor(
    private afs: AngularFirestore
    
  ) {}

////////////////////////////////////////////////////////////////////
  creer(user:any){
    return this.afs.collection('performances').doc(user.uid).set({
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
    return this.afs.doc(`performances/${id}`).valueChanges() as Observable<Perf>;
  }
  //////////////////////////    PERFORMANCES    ////////////////////////////////////////////
  enregistrer(x:any){
    return this.afs.collection('performances').doc(x.id).update({
    totalSets: x.totalSets,
    record5s: x.record5s ,
    record10s: x.record10s , 
    record3m: x.record3m,
    recordD: x.recordD 
    });
  }
    //-------------
  getAllGains(monidauth:string){
      return this.afs.collection(`performances/${monidauth}/gains`).valueChanges() as Observable<any>;
    }
  ///////////////////////////////////////////////////////////////////////
  majNiveau(x:any){
    return this.afs.collection('performances').doc(x.id).update({
      niveau: x.niveau
    })
  }
  //--------------
  majTheme(x:any){
    return this.afs.collection('performances').doc(x.id).update({
      theme: x.theme
    })
  }
  //--------------
  majMode(x:any){
    return this.afs.collection('performances').doc(x.id).update({
      mode: x.mode
    })
  }
  //--------------
  //////////////////////////////////////    PARTIES    ///////////////////////////////////////////////////////////////
newPartie(partie:any){
  console.log('on créée');
    return this.afs.collection('parties').doc(`n-${partie.num}`).set({
     joueur1: partie.joueur1, joueur2: partie.joueur2,
     num: partie.num,
     'co1':false, 'co2':false,
     score1:0,score2:0,
     classetoile1:'invisible',  classetoile2:'invisible',  classerreur1:'invisible',  classerreur2:'invisible', 
     classetemps1: 'invisible', classetemps2:'invisible',
     cartes: partie.cartes,
     douze:partie.douze,
     encours:false,gagnant:'',colorbuzz:'eteint', posbuzz:'milieu',
     interdit : 0, 
     buzz:false,set1:false,set2:false, 
     finito: false
     
    });
  }
  //-----------------------
  getPartieId(idpartie:any){
    return this.afs.doc(`parties/n-${idpartie}`).valueChanges() as Observable<any>;
  }
  //------------------------
  getpartieById(idpartie:any){
    return this.afs.collection('parties').doc(`n-${idpartie}`).valueChanges() as Observable<any>;
  }
  //-----------------------
  updateqqch(idpartie:string, objet:any){
    return this.afs.doc(`parties/n-${idpartie}`).update(objet);
  }
  //------------------------
  coDuel1(idpartie:string, etat:boolean){
    return this.afs.doc(`parties/n-${idpartie}`).update({'co1':etat});
  }
  coDuel2(idpartie:string, etat:boolean){
    return this.afs.doc(`parties/n-${idpartie}`).update({'co2':etat});
  }
  ////////////////////////////////////////    MA COLLECTION mb- ///////////////////////////
  getAmi(monpseudo:string, ami:any){ //ne marche pas si on écrit pas 'mb-' avant le variable
    return this.afs.doc(`mb-${monpseudo}/${ami}`).valueChanges() as Observable<any>;
  }
  //---------
  getAllAmis(monpseudo:string){
    return this.afs.collection(`mb-${monpseudo}`).valueChanges({idField:'pseudo'}) as Observable<any>;
  }
  //---------
  majMaCollek(monpseudo:string,ami:string, objet:any){
    return this.afs.doc(`mb-${monpseudo}/${ami}`).update(objet); 
  }
  //---------
  majCollekAmi(monpseudo:string,ami:string, objet:any){
    return this.afs.doc(`mb-${ami}/${monpseudo}`).update(objet); 
  }
  /////////////////////////////////////////   MEMBRES    /////////////////////////////////////
  getAllMb(){
    return this.afs.collection('membres').valueChanges({idField:'pseudo'}) as Observable<any>;
  }
  //------
  getMb(rech:string){
    return this.afs.collection('membres').doc(rech).valueChanges() as Observable<any>;
  }
  //-------------
  getIdauth(idauth:string){
   return this.afs.collection('membres', ref=> ref.where('idauth','==',idauth)).valueChanges() as Observable<any>;
  }
  //---------------
  deco(monpseudo:string){
    return this.afs.collection('membres').doc(`${monpseudo}`).update({
      etat:'deco'
    });
  }
  //--------------
  co(monpseudo:string){
    return this.afs.collection('membres').doc(monpseudo).update({
      etat:'co'
    });
  }
//////////////////
ajouter(monpseudo:string, monidauth:string,monetat:string, pseudo:string,idauth:string,etat:string){
  this.afs.collection(`mb-${monpseudo}`).doc(pseudo).set({
 'pseudo':pseudo, 'idauth':idauth, 'statut':'aucun', 'etat': etat, 
  });
  this.afs.collection(`mb-${pseudo}`).doc(monpseudo).set({
 'pseudo': monpseudo, 'idauth':monidauth, 'statut':'aucun', 'etat':monetat
    });
    return;
}
//-------------
inscr(monpseudo:string, monidauth:string){
  return this.afs.collection(`membres`).doc(monpseudo).set({
    'etat': 'co' ,'idauth': monidauth, 'pseudo': monpseudo
    });
    
}
  /////////////////////////////////////////////////////
  creerHisto(num: string,monpseudo:string, adv:string, score:number, scoreadv:number, gain:boolean, date:string){
   
    return this.afs.doc(`hist/${monpseudo}/gains/num${num}`).set({
      num:num,
      adv: adv,
      score:score,
      scoreadv: scoreadv,
      gain: gain,
      date: date
    });
  }
  //------------------------
  getHistByNum(monpseudo:string,num:string){
 return this.afs.collection(`hist/${monpseudo}/gains`).valueChanges() as Observable<any>;
  }
  getStat(monpseudo:string){
    return this.afs.collection(`hist/${monpseudo}/gains`, ref=> ref.orderBy('date','desc')).valueChanges();
  }
  //-----------------------------------------------
  deletePartie(num:string){
    return this.afs.collection('parties').doc(`n-${num}`).delete();
  }




}
