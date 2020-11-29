import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent implements OnInit {
  showSidebar = true;
  constructor() {}

  ngOnInit(): void {}

  onMenuToggle(): void {
    this.showSidebar = !this.showSidebar;
  }
}
