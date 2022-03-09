import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeComponent } from './components/theme/theme.component';
import { JeuComponent } from './components/jeu/jeu.component';
import { HomeComponent } from './components/home/home.component';
import { FinComponent } from './components/fin/fin.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeComponent,
    JeuComponent,
    HomeComponent,
    FinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
