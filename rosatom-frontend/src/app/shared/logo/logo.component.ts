import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { logo } from 'src/app/core/constants';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent implements OnInit {
  logo = logo;
  constructor() {}

  ngOnInit(): void {}
}
