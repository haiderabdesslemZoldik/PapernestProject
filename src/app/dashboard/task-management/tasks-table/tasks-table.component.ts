import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../data/models/task.model';
import * as TaskActions from '../data/store/actions/task.actions';
import { TaskState } from '../data/store/reducers/task.reducer';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, AddTaskComponent,CommonModule,MatDialogModule,CdkDropList, CdkDrag],
})

export class TasksTableComponent implements AfterViewInit {
  
  tasks$: Observable<Task[]>;
  dataSource!: MatTableDataSource<Task>;
  displayedColumns: string[] = ['id', 'label', 'description','state','Actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog, private store: Store<{ task: TaskState }>,private toastr: ToastrService) {
    this.tasks$ = this.store.select(state => state.task.tasks);
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());
    this.tasks$.subscribe(tasks => {
      this.dataSource = new MatTableDataSource(tasks);
    });
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '300px',
      data: { label: '', description: '', update: false }
    });

    dialogRef.afterClosed().subscribe(task => {
      if (task) {
        // Add the new task to the store
        const newTask: Task = {
          id: uuidv4(),
          label: task.label,
          description: task.description,
          taskState: false
        };
        this.store.dispatch(TaskActions.addTask({ task: newTask }));
        this.toastr.success('This Task has been added succefully!');
        // Refresh the table data directly after adding the task
        this.tasks$.subscribe(tasks => {
          this.dataSource.data = tasks;
        });
      }
    });
  }

  openupdateTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '300px',
      data: { label: task.label, description: task.description, update: true, id: task.id }
    });
    dialogRef.afterClosed().subscribe((taskUpdated: Task) => {
      if (taskUpdated) {
        // update the  task in the store
        this.store.dispatch(TaskActions.editTask({ task: taskUpdated }));
        this.toastr.info('This Task has been updated succefully!');

        // Refresh the table data directly after updating the task
        this.tasks$.subscribe(tasks => {
          this.dataSource.data = tasks;
        });
      }
    });
  }

  toggleTaskCompletion(taskId: string) {
    this.store.dispatch(TaskActions.toggleTaskCompletion({ taskId }));
  }

  deleteTask(taskId: string) {
    this.store.dispatch(TaskActions.deleteTask({ taskId }));
    this.toastr.info('This Task has been deleted succefully!');

  }

  getTaskClass(task: any): string {
    return task.taskState  ? 'completed' : 'not-completed';
  }

  drop(event: CdkDragDrop<Task[]>) {
  const tasksCopy = [...this.dataSource.data];
  moveItemInArray(tasksCopy, event.previousIndex, event.currentIndex);
  this.dataSource.data = tasksCopy;
}

}



