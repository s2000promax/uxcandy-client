import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editable-task-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editable-task-form.component.html',
  styleUrls: ['./editable-task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableTaskFormComponent {

}
