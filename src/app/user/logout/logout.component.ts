import { Component, OnInit } from '@angular/core';

// Importa dependências
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(
    // Injeta dependências
    public auth: AngularFireAuth,
    public router: Router
  ) {}

  ngOnInit(): void {}

  // Faz logout do usuário
  logout() {
    this.auth
      .signOut()
      .then((uData) => {
        // Exibe mensagem de confirmação
        alert(`Ok! Você saiu do site...`);

        // Vai para a página inicial
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error(`Erro ao fazer logout: ${error}`);
      });
  }
}
