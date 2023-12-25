import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@core/services';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthButtonComponent implements OnInit, OnDestroy {
  public isAuth: boolean = false;
  private destroyed$ = new Subject<void>();

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.authService.isAuth$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((authStatus) => {
        this.isAuth = authStatus;
      });
  }

  public toggleAuth(): void {
    if (this.isAuth) {
      this.authService.logout();
    } else {
      this.router.navigate(['auth', 'login']);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
