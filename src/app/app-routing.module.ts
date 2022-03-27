import { FinduoComponent } from './components/finduo/finduo.component';
import { DuoComponent } from './components/duo/duo.component';

import { ChallengeComponent } from './components/challenge/challenge.component';
import { ButComponent } from './components/but/but.component';
import { BienvenueComponent } from './components/bienvenue/bienvenue.component';
import { FinComponent } from './components/fin/fin.component';
import { JeuComponent } from './components/jeu/jeu.component';
import { ThemeComponent } from './components/theme/theme.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuelComponent } from './components/duel/duel.component';

const routes: Routes = [
  {path:"", component:BienvenueComponent},
  {path:'but', component: ButComponent},
  {path:'challenge/:id', component: ChallengeComponent},
   {path:'theme/:id', component:ThemeComponent},
  {path:'jeu/:id', component:JeuComponent},
  {path:'duo', component:DuoComponent},
  {path:'duel/:id', component: DuelComponent},
  {path:'fin/:id',component:FinComponent},
{path: 'finduo/:id',component:FinduoComponent}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
