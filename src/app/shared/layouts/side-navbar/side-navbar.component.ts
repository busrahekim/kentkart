import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-navbar',
  standalone: true,
  imports: [CommonModule, MatListModule, RouterModule, MatSidenavModule],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss',
})
export class SideNavbarComponent {
  navLinks = [
    { label: 'Employees', path: '/employees' },
    { label: 'Companies', path: '/companies' },
  ];
}
