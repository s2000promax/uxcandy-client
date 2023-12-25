import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SortDirectionType, SortFieldType } from '@core/types';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  public sortFieldSubject = new BehaviorSubject<SortFieldType>('id');
  public sortField$ = this.sortFieldSubject.asObservable();

  public sortDirectionSubject = new BehaviorSubject<SortDirectionType>('asc');
  public sortDirection$ = this.sortDirectionSubject.asObservable();

  public currentPageSubject = new BehaviorSubject<number>(1);
  public currentPage$ = this.currentPageSubject.asObservable();

  public totalTasksCountSubject = new BehaviorSubject<number>(0);
  public totalTasksCount$ = this.totalTasksCountSubject.asObservable();
}
