import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
      <router-outlet></router-outlet>
    `,
  styles: [
    "#splashText { color: red; font-family: Comic Sans MS; font-size: 144px; font-weight: 900; text-align: center; margin-top: 10% }",
  ]
})
export class AppComponent {
    title = 'app';
}
