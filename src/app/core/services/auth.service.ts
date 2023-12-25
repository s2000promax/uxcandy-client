import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersistenceService } from '@core/services/persistence.service';
import { LocalStorageEnum } from '@core/enums';
import { ApiService } from '@core/services/api.service';
import { ILoginRequest } from '@core/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly persistenceService = inject(PersistenceService);
  private readonly apiService = inject(ApiService);

  constructor() {
    const token = this.getToken();
    if (token) {
      this.isAuthSubject.next(true);
    }
  }

  private isAuthSubject = new BehaviorSubject<boolean>(false);
  public isAuth$ = this.isAuthSubject.asObservable();

  public getToken(): string | null {
    return this.persistenceService.get(LocalStorageEnum.TOKEN);
  }

  public setAuth(token: string) {
    this.persistenceService.set(LocalStorageEnum.TOKEN, token);
    this.isAuthSubject.next(true);
  }

  public login(data: ILoginRequest) {
    return this.apiService.login(data);
  }

  public logout(): void {
    this.persistenceService.remove(LocalStorageEnum.TOKEN);
    this.isAuthSubject.next(false);
  }
}
