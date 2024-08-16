import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { Task } from '../data/models/task.model';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule,MatInputModule,  FormsModule,CommonModule
  ],
})
export class AddTaskComponent {
 
   constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { label: string, description: string,update:boolean,id:string }
  ) {}

  onClickCancel(): void {
    this.dialogRef.close();
  }
}
