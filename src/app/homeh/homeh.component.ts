import { Component } from '@angular/core';

@Component({
  selector: 'app-homeh',
  templateUrl: './homeh.component.html',
  styleUrls: ['./homeh.component.scss']
})
export class HomehComponent {
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
