import { Component } from '@angular/core';

@Component({
  selector: 'app-home-a',
  templateUrl: './home-a.component.html',
  styleUrls: ['./home-a.component.scss']
})
export class HomeAComponent {

  sideBarOpenn = true;

  sideBarTogglerr() {
    this.sideBarOpenn = !this.sideBarOpenn;
  }
}
