import { Component } from '@angular/core';

// Navegar até
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MeuApp02';

  constructor(private viewportScroller: ViewportScroller) {}

  public toAnchor(elementId: string): void {
      this.viewportScroller.scrollToAnchor(elementId);
  }
}
