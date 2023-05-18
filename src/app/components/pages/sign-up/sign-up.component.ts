import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
})
export class SignUpComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService
  ) {}

  loader = false;
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
    passwordRepeat: new FormControl(null, [Validators.required]),
    nickname: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-z0-9]+$'),
    ]),
  });

  async signUp() {
    this.loader = true;
    let status = await this.authService.signUp(
      this.form.controls.email.value!,
      this.form.controls.password.value!,
      this.form.controls.nickname.value!
    );
    this.loader = false;
    this.alerts.open(status.message!).subscribe({
      complete: () => {},
    });
    if (status.code === 21) {
      this.router.navigate(['']);
    }
  }

  goHome() {
    this.router.navigate(['start']);
  }
}
