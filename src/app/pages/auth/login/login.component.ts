import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@core/services';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BaseForm, ILoginRequest, IResponse } from '@core/types';
import { ResponseStatusEnum } from '@core/enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup<BaseForm<ILoginRequest>>;

  public submitted: boolean = false;
  public error: Partial<IResponse> = {};

  private destroyed$ = new Subject<void>();

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loginForm = this.fb.nonNullable.group({
      username: ['', []],
      password: ['', []],
    });
  }

  onSubmit() {
    this.error = {};
    this.submitted = true;

    this.authService
      .login(this.loginForm.getRawValue())
      .pipe(takeUntil(this.destroyed$))
      .subscribe((response) => {
        if (
          response.status === ResponseStatusEnum.OK &&
          response.message?.token
        ) {
          this.authService.setAuth(response.message.token);
          this.router.navigate(['/']);
        } else {
          this.error = response;
          this.submitted = false;
        }
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
