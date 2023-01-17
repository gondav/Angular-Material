import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  isSidenavOpened = false;

  openSidenav(): void {
    this.isSidenavOpened = true;
  }
}
