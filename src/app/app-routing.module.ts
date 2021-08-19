import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa páginas
import { HomeComponent } from './pages/home/home.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AboutComponent } from './pages/about/about.component';
import { E404Component } from './pages/e404/e404.component';

const routes: Routes = [
  // Rota para a página inicial --> path vazio
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Rota para a página "home"
  { path: 'home', component: HomeComponent },

  // Rota para a página "contacts"
  { path: 'contacts', component: ContactsComponent },

  // Rota para a página "about"
  { path: 'about', component: AboutComponent },

  // Rota para página de erro 404
  // Caso a rota não exista esta rota será carregada (Rota Coringa)
  // DEVE SER SEMPRE A ÚLTIMA ROTA
  {path:'**',component: E404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
