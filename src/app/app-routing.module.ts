import { JeuComponent } from './components/jeu/jeu.component';
import { ThemeComponent } from './components/theme/theme.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', component:JeuComponent},
  {path:'theme', component:ThemeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
