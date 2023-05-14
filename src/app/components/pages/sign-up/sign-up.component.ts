import { VariableBinding } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
})
export class SignUpComponent {
  constructor(private authService: AuthService) {}
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
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
  });

  async signUp() {
    this.loader = true;
    let status = await this.authService.signUp(
      'test2@ds.com',
      'pass22222',
      'Samx'
    );
    console.log(status.message);
    console.log(this.form.value);
  }
}
