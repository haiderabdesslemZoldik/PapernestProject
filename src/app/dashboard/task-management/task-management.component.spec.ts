import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { TaskManagementComponent } from './task-management.component';

describe('TaskManagementComponent', () => {
  let component: TaskManagementComponent;
  let fixture: ComponentFixture<TaskManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskManagementComponent,Store]
    });
    fixture = TestBed.createComponent(TaskManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
