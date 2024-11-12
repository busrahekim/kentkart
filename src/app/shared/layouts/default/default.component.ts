import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultComponent {
  componentTitle: string = 'KentKart System';
  componentDesc: string =
    'An international company that provides public transportation fare collection services, where hundreds of thousands of instant data are processed, analyzed and reported.';
}
