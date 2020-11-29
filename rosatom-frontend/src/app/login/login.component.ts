import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  error: string | null = null;
  form: FormGroup = new FormGroup({
    username: new FormControl('admin', Validators.required),
    password: new FormControl('123sdfwrew142134', Validators.required),
  });
  hide = true;

  constructor(private router: Router) {}

  submit(): void {
    if (this.form.valid) {
      this.router.navigate(['/secure']);
    }
  }
}
