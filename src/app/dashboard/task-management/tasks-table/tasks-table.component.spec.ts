import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksTableComponent } from './tasks-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { AddTaskComponent } from '../add-task/add-task.component';
import { CommonModule } from '@angular/common';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('TasksTableComponent', () => {
  let component: TasksTableComponent;
  let fixture: ComponentFixture<TasksTableComponent>;
  let store: MockStore;
  const initialState = {
    task: {
      tasks: [
        { id: '1', label: 'Task 1', description: 'Task 1 Description', taskState: false },
        { id: '2', label: 'Task 2', description: 'Task 2 Description', taskState: true }
      ]
    }
  };
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksTableComponent], // Import the standalone component here
      providers: [
        provideMockStore({ initialState }), // Provide the mock store with an initial state
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
