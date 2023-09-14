import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public opened!: boolean;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(public authService: AuthService) { }

  clickHandler() {
    this.sidenav.close();
  }

}
