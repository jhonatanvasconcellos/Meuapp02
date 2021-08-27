import { Component, OnInit } from '@angular/core';

// Importa dependências
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    // Injeta dependências
    public auth: AngularFireAuth,
    public router: Router
  ) {}

  ngOnInit(): void {}

  // Faz login do usuário
  login() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        // Se logou...
        (uData) => {
          // Exibe mensagem de confirmação
          alert(
            `Olá ${uData.user.displayName}!\n\nVocê já pode acessar nosso conteúdo exclusivo...`
          );

          // Vai para a página inicial
          this.router.navigate(['/home']);
        }
      )
      .catch((error) => {
        console.error(`Erro ao tentar fazer login: ${error}`);
      });
  }
}
