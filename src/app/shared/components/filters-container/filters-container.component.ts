import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { SortDirectionType, SortFieldType } from '@core/types';
import { FiltersService } from '@core/services';
import { MatCardModule } from '@angular/material/card';
import { RoundedButtonComponent } from '@shared/components/rounded-button/rounded-button.component';

@Component({
  selector: 'app-filters-container',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonToggleModule,
    FormsModule,
    MatCardModule,
    RoundedButtonComponent,
  ],
  templateUrl: './filters-container.component.html',
  styleUrls: ['./filters-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersContainerComponent {
  @Output() onCreate = new EventEmitter<void>();

  private readonly filtersService = inject(FiltersService);

  public sortDirection: SortDirectionType = 'asc';
  public sortField: SortFieldType = 'id';

  public onSortDirectionChange(value: SortDirectionType) {
    this.filtersService.sortDirectionSubject.next(value);
  }

  public onSortFieldChange(value: SortFieldType) {
    this.filtersService.sortFieldSubject.next(value);
  }

  public handleCreate() {
    this.onCreate.emit();
  }
}
