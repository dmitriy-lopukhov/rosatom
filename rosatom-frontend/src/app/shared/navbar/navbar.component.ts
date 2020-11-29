import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Output() menuToggle = new EventEmitter();
  constructor(private router: Router) {}

  onClick(): void {
    this.menuToggle.next();
  }

  logout(): void {
    this.router.navigate(['/']);
  }
}
