import { FinComponent } from './components/fin/fin.component';
import { HomeComponent } from './components/home/home.component';
import { JeuComponent } from './components/jeu/jeu.component';
import { ThemeComponent } from './components/theme/theme.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:'jeu', component:JeuComponent},
  {path:'theme', component:ThemeComponent},
  {path:'fin',component:FinComponent}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
