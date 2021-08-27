import { Component, OnInit } from '@angular/core';

// Importa dependências
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    // Injeta dependências
    public auth: AngularFireAuth
  ) {}

  ngOnInit(): void {}

  // Abre perfil do usuário no provedor de autenticação
  openProfile() {
    window.open('https://myaccount.google.com/');
  }
}
