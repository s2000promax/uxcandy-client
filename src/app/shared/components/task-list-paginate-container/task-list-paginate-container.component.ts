import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list-paginate-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list-paginate-container.component.html',
  styleUrls: ['./task-list-paginate-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListPaginateContainerComponent {

}
