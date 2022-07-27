import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MagicsquareComponent } from './magicsquare/magicsquare.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SubstringComponent } from './substring/substring.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'magicsquare', component: MagicsquareComponent},
  {path: 'substring', component: SubstringComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
