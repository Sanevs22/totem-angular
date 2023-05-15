import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiAlertService } from '@taiga-ui/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent {
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
  });

  async login() {
    this.loader = true;
    this.loader = false;
    this.alerts.open('молодец').subscribe({
      complete: () => {},
    });
    console.log(this.form.value);
  }

  goHome() {
    this.router.navigate(['']);
  }
}
