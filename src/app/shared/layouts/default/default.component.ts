import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { LoginModalComponent } from '../../components/login-modal/login-modal.component';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-default',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent, LoginModalComponent, SideNavbarComponent, MatSidenavModule],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultComponent {
  loginModalVisible = false;

  showLoginModal() {
    this.loginModalVisible = true;
  }

  closeLoginModal() {
    this.loginModalVisible = false;
  }
}
