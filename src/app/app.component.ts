import { Component } from '@angular/core';

// Navegar até
import { ViewportScroller } from '@angular/common';

// Importa authenticator
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MeuApp02';

  constructor(
    // Injeta dependências
    private viewportScroller: ViewportScroller,
    public auth: AngularFireAuth
  ) {}

  public toAnchor(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
