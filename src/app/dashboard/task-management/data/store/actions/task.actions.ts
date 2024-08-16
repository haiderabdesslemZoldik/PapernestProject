import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const deleteTask = createAction('[Task] Delete Task', props<{ taskId: string }>());
export const toggleTaskCompletion = createAction('[Task] Toggle Task Completion', props<{ taskId: string }>());
export const loadTasks = createAction('[Task] Load Tasks');
export const setTasks = createAction('[Task] Set Tasks', props<{ tasks: Task[] }>());
export const editTask = createAction(
    '[Task] Edit Task',
    props<{ task: Task }>()
  );