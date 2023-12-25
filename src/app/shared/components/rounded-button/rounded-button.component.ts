import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rounded-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './rounded-button.component.html',
  styleUrls: ['./rounded-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundedButtonComponent {
  @Input() type: 'add' | 'edit' = 'add';
  @Input() disabled: boolean = false;
  @Output() onButtonClick = new EventEmitter<void>();

  public onClick() {
    this.onButtonClick.emit();
  }
}
