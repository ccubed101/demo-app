import { Component } from '@angular/core';

@Component({
    selector: 'splash',
    template: `
        <div id="splashText">
          Splash Page X!
        </div>
    `,
  styles: [
    "#splashText { color: red; font-family: Comic Sans MS; font-size: 144px; font-weight: 900; text-align: center; margin-top: 10% }",
  ]
})
export class SplashComponent {
}
