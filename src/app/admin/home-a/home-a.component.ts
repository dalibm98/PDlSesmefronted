import { Component } from '@angular/core';

@Component({
  selector: 'app-home-a',
  templateUrl: './home-a.component.html',
  styleUrls: ['./home-a.component.scss']
})
export class HomeAComponent {

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
