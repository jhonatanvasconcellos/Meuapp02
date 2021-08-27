import { Component, OnInit } from '@angular/core';

// Importa dependências
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import { AngularFireAuth } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {

  /***** Atributos *****/

  public id: string; // Armazena o ID do artigo a ser visualizado
  public item: Observable<any>; // Armazena o artigo completo
  public comments: any; // Armazena os comentários do artigo

  public comment: any; // Comentário sendo processado

  public user: any; // Dados do usuário logado
  public uComment: string; // Campo de novo comentário
  public uDate: string; // Data do comentário

  public pipe = new DatePipe('en_US'); // Formatar as datas

  constructor(
    // Injeta dependência
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private router: Router,
    public auth: AngularFireAuth,
  ) {

    // Obtém dados do usuário logado
    this.auth.onAuthStateChanged((userData) => {
      this.user = userData;
      console.log(this.user);
    });

  }

  ngOnInit(): void {

    // Obter o ID da rota e armazena em id
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    // Verifica se documento existe
    this.afs.firestore.doc(`articles/${this.id}`).get()
      .then(docSnapshot => {
        if (!docSnapshot.exists) {

          // Se não existe, exibe página erro 404
          this.router.navigate(['\e404']);
        }
      });

    // Obter o artigo do firestore à partir do ID
    this.item = this.afs.doc(`articles/${this.id}`).valueChanges();

    // Verifica se existem comentários
    this.afs.firestore.collection('comments')
      .where('article', '==', this.id)
      .where('status', '==', 'ativo')
      .orderBy('date', 'desc')
      .get()
      .then(
        docSnapshot => {
          if (docSnapshot.empty) {
            this.comments = '';
          } else {

            // Obter os comentários deste artigo
            this.comments = this.afs
              .collection('comments', (ref) =>
                ref.where('article', '==', this.id).where('status', '==', 'ativo').orderBy('date', 'desc')
              )
              .valueChanges();

          }
        }
      );
  }

  sendComment() {

    // Cria e formata a data do cometário
    this.uDate = this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss').trim();

    // Remove espaços do comentário
    var tempComment = this.uComment.trim();

    // Cria comentário se ele não esta vazio
    if (tempComment !== '') {
      this.comment = {
        date: this.uDate,
        article: this.id,
        uid: this.user.uid,
        name: this.user.displayName,
        email: this.user.email,
        photo: this.user.photoURL,
        comment: tempComment.replace(/<[^>]*>?/gm, '').replace(/\n/g, '<br />'),
        status: 'ativo',
      };

      // Salva comentário no banco de dados
      this.afs
        .collection('comments')
        .add(this.comment)
        .then(() => {
          // Mostra feedback
          alert(`Olá ${this.user.displayName}!\n\nSeu comentário foi enviado com sucesso.\n\nObrigado...`);
          this.uComment = '';
        })
        .catch(
          (error) => {
            console.error(`Erro ao comentar: ${error}`)
          }
        );
    } else {
      this.uComment = '';
      return false;
    }
  }

}
