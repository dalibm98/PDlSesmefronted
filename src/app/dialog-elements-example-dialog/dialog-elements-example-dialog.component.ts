import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-dialog-elements-example-dialog',
  templateUrl: './dialog-elements-example-dialog.component.html',
  styleUrls: ['./dialog-elements-example-dialog.component.scss'],

  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(500))
    ])
  ]
})
export class DialogElementsExampleDialogComponent {

}
