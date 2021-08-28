import { Component, OnInit } from '@angular/core';

// Importa dependências
import { AngularFireAuth } from '@angular/fire/auth';

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';

// Não permite somente espaços nos campos
export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  // Atributos
  public contactForm: FormGroup; // Contém o formulário de contatos
  public pipe = new DatePipe('en_US'); // Formatar as datas
  public user: any; // Dados do usuário logado

  constructor(
    // Injeta dependências
    public auth: AngularFireAuth,
    public form: FormBuilder,
    public afs: AngularFirestore
  ) {}

  ngOnInit(): void {
    // Cria o formulário de contatos
    this.contactFormCreate();

    // Preenche nome e email se usuário está logado
    if (this.contactForm) {
      this.auth.onAuthStateChanged((userData) => {
        if (userData) {
          this.contactForm.controls.name.setValue(userData.displayName.trim());
          this.contactForm.controls.email.setValue(userData.email.trim());
        }
      });
    }
  }

  // Cria o formulário de contatos
  contactFormCreate() {
    this.contactForm = this.form.group({
      date: [''], // Data de envio do contato

      // Nome do remetente
      name: [
        '', // Valor inicial
        Validators.compose([
          // Validação do campo
          Validators.required, // Obrigatório
          Validators.minLength(3), // Pelo menos 3 caracteres
          removeSpaces, // Não permite somente espaços
        ]),
      ],

      // Email do remetente
      email: [
        '', // Valor inicial
        Validators.compose([
          // Validação do campo
          Validators.required, // Obrigatório
          Validators.email, // Deve ser um endereço de e-mail
          removeSpaces, // Não permite somente espaços
        ]),
      ],

      // Assunto do contato
      subject: [
        '', // Valor inicial
        Validators.compose([
          // Validação do campo
          Validators.required, // Obrigatório
          Validators.minLength(5), // Pelo menos 5 caracteres
          removeSpaces, // Não permite somente espaços
        ]),
      ],

      // Mensagem do contato
      message: [
        '', // Valor inicial
        Validators.compose([
          // Validação do campo
          Validators.required, // Obrigatório
          Validators.minLength(5), // Pelo menos 5 caracteres
          removeSpaces, // Não permite somente espaços
        ]),
      ],
      status: ['ativo'], // Status do contato
    });
  }

  // Processa e envia contato
  contactSend() {
    // Cria e formata a data
    this.contactForm.controls.date.setValue(
      this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss').trim()
    );

    // Salva em um novo documento do Firebase Firestore
    this.afs
      .collection('contacts')
      .add(this.contactForm.value)
      .then(() => {
        // Pega somente o primeiro nome
        var name = this.contactForm.controls.name.value;
        var fName = name.split(' ');

        // Mostra feedback
        alert(
          `Olá ${fName[0]}!\n\nSeu contato foi enviado com sucesso.\n\nObrigado...`
        );

        // Reset do formulário
        this.contactForm.reset({
          name: this.contactForm.controls.name.value,
          email: this.contactForm.controls.email.value,
          subject: '',
          message: '',
          date: '',
          status: 'ativo',
        });
      })
      .catch((error) => {
        console.error(`Erro ao enviar contato: ${error}`);
      });
  }
}
