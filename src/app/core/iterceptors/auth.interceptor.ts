import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { FiltersService } from '@core/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private filtersService!: FiltersService;

  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    let params = new HttpParams().set('developer', 's2000promax');

    if (request.method === 'GET') {
      if (!this.filtersService) {
        this.filtersService = this.injector.get(FiltersService);
      }
      params = params
        .set('sort_field', this.filtersService.sortFieldSubject.value)
        .set('sort_direction', this.filtersService.sortDirectionSubject.value)
        .set('page', this.filtersService.currentPageSubject.value);
    }

    request = request.clone({
      params,
    });

    return next.handle(request);
  }
}
