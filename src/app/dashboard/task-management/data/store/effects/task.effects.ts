import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as TaskActions from '../actions/task.actions';
import { TaskState } from '../reducers/task.reducer';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private store: Store<{ task: TaskState }>) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      map(() => {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        return TaskActions.setTasks({ tasks });
      })
    )
  );

  saveTasks$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          TaskActions.addTask,
          TaskActions.editTask,
          TaskActions.deleteTask,
          TaskActions.toggleTaskCompletion
        ),
        tap(action => {
          this.store.select('task').subscribe(taskState => {
            localStorage.setItem('tasks', JSON.stringify(taskState.tasks));
          });
        })
      ),
    { dispatch: false }
  );
}
