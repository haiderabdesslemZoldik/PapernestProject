import { Component, OnInit } from '@angular/core';
import { TasksTableComponent } from './tasks-table/tasks-table.component';


@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css'],
  standalone:true,
  imports:[TasksTableComponent, ]
})
export class TaskManagementComponent implements OnInit {

  constructor() {
  }
  ngOnInit(): void {
  }
  

 

}
