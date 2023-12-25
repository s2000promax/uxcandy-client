import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITask } from '@core/types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StatusPipe } from '@core/pipes';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '@core/services';
import { RoundedButtonComponent } from '@shared/components/rounded-button/rounded-button.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    StatusPipe,
    MatCardModule,
    RoundedButtonComponent,
  ],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardComponent {
  @Input() task!: ITask;
  @Output() onEdit = new EventEmitter<ITask>();
  public readonly authService = inject(AuthService);

  public onClick() {
    this.onEdit.emit(this.task);
  }
}
