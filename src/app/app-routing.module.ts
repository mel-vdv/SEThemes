import { NiveauComponent } from './components/niveau/niveau.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { ButComponent } from './components/but/but.component';
import { BienvenueComponent } from './components/bienvenue/bienvenue.component';
import { FinComponent } from './components/fin/fin.component';
import { HomeComponent } from './components/home/home.component';
import { JeuComponent } from './components/jeu/jeu.component';
import { ThemeComponent } from './components/theme/theme.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"", component:BienvenueComponent},
  {path:'but', component: ButComponent},
  {path: 'niveau', component:NiveauComponent},
  {path:'challenge', component: ChallengeComponent},
   {path:'theme', component:ThemeComponent},
  {path:'jeu', component:JeuComponent},
  {path:'fin',component:FinComponent}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
