import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { SlidePanelAction } from '../../../core/constants/enums';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-slide-panel',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './slide-panel.component.html',
  styleUrl: './slide-panel.component.scss',
  animations: [
    trigger('fadeSlideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class SlidePanelComponent {
  @Input() isOpen = false;
  @Input() headerText = 'Slide Panel Header';
  @Input() currentAction: SlidePanelAction | null = null; 
  @Input() employees: any[] = [];
  @Input() company: any = null; 
  @Output() onClose = new EventEmitter<boolean>();

  onClosePanel() {
    this.onClose.emit(false); 
  }
}
