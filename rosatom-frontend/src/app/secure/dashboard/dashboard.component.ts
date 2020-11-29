import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  showSidebar = true;
  constructor() {}

  ngOnInit(): void {}

  onMenuToggle(): void {
    this.showSidebar = !this.showSidebar;
  }
}
