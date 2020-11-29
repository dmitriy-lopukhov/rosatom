import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedTasksComponent } from './linked-tasks.component';

describe('LinkedTasksComponent', () => {
  let component: LinkedTasksComponent;
  let fixture: ComponentFixture<LinkedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkedTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
