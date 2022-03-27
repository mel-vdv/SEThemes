import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule} from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';

import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeComponent } from './components/theme/theme.component';
import { JeuComponent } from './components/jeu/jeu.component';
import { FinComponent } from './components/fin/fin.component';
import { environment } from '../environments/environment';
import { BienvenueComponent } from './components/bienvenue/bienvenue.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { ButComponent } from './components/but/but.component';
import { DuoComponent } from './components/duo/duo.component';
import { DuelComponent } from './components/duel/duel.component';
import { FinduoComponent } from './components/finduo/finduo.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeComponent,
    JeuComponent,
    FinComponent,
    BienvenueComponent,
    ChallengeComponent,
    ButComponent,
    DuoComponent,
    DuelComponent,
    FinduoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
