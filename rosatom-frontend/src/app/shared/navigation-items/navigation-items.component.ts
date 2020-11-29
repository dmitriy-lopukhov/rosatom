import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-navigation-items',
  templateUrl: './navigation-items.component.html',
  styleUrls: ['./navigation-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationItemsComponent implements OnInit {
  links: { path: string[]; title: string }[] = [
    { path: ['/secure/dashboard'], title: 'Задачи' },
    { path: ['/secure/employees'], title: 'Сотрудники' },
    { path: ['/secure/reports'], title: 'Отчеты' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
