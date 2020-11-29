import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-avatar-menu',
  templateUrl: './avatar-menu.component.html',
  styleUrls: ['./avatar-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarMenuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
