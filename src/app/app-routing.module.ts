import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa páginas
import { HomeComponent } from './pages/home/home.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AboutComponent } from './pages/about/about.component';
import { E404Component } from './pages/e404/e404.component';
import { ViewComponent } from './pages/view/view.component';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { ProfileComponent } from './user/profile/profile.component';

// Importa dependências do AuthGuard
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

/* Redirecionamentos do AuthGuard */

// Usuário não logado? Vai para a página de login.
const toLogin = () => redirectUnauthorizedTo(['/user/login']);

// Usuário está logado? Vai para a página de conteúdo.
const isLogged = () => redirectLoggedInTo(['/home']);

const routes: Routes = [
  // Rota para a página inicial --> path vazio
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Rota para a página "home"
  { path: 'home', component: HomeComponent },

  // Rota para a página "contacts"
  { path: 'contacts', component: ContactsComponent },

  // Rota para a página "about"
  { path: 'about', component: AboutComponent },

  // Rota para a página "view"
  {
    path: 'view/:id',
    component: ViewComponent,

    // Se usuário não está logado, envia para "login"
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin },
  },

  // Rota para a página "e404"
  { path: 'e404', component: E404Component },

  // Rota para a página de login
  {
    path: 'user/login',

    // Se já está logado vai para o conteúdo
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: isLogged },
  },

  // Rota para a página de logout
  {
    path: 'user/logout',
    component: LogoutComponent,

    // Se não está logado para login
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin },
  },

  // Rota para a página de perfil do usuário
  {
    path: 'user/profile',
    component: ProfileComponent,

    // Se não está logado vai para login
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin },
  },

  // Rota para página de erro 404
  // Caso a rota não exista esta rota será carregada (Rota Coringa)
  // DEVE SER SEMPRE A ÚLTIMA ROTA
  { path: '**', component: E404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
