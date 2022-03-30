import { Component , HostListener} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'ng-setheme';

  constructor(
   private afs: AngularFirestore
  ){
  
  }
  ///  IMPORTANT POUR QUE LE USER SOIT DECONNECTE DANS FIREBASE SI IL FERME LA WINDOW
  /*
  @HostListener('window:unload', [ '$event' ]) 
  unloadHandler() { 
    this.afs.collection('membres').doc('mel').update({etat:'deco'});
  }
  @HostListener('window:beforeunload', [ '$event' ]) 
   beforeUnloadHandler() { 
    this.afs.collection('membres').doc('mel').update({etat:'deco'});
   } */
  
 
 
}