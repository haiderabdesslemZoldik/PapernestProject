import { createReducer, on } from '@ngrx/store';
import { Task } from '../../models/task.model';
import * as TaskActions from '../actions/task.actions';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: []
};

const _taskReducer = createReducer(
  initialState,
  on(TaskActions.addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  })),
  on(TaskActions.editTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => (t.id === task.id ? { ...task } : t))
  })),
  on(TaskActions.deleteTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== taskId)
  })),
  on(TaskActions.toggleTaskCompletion, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.map(task =>
      task.id === taskId ? { ...task, taskState: !task.taskState } : task
    )
  })),
  on(TaskActions.setTasks, (state, { tasks }) => ({
    ...state,
    tasks: [...tasks]
  }))
);

export function taskReducer(state: any, action: any) {
  return _taskReducer(state, action);
}
