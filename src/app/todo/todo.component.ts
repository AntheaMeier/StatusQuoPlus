import {Component, Input, OnInit} from '@angular/core';
import {Tasks} from "../shared/tasks";
import {TaskdataService} from "../taskdata.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input()
  tasksToOneGoal: Tasks[] =this.lol.getData()
  showData: boolean = false;

  constructor(private lol: TaskdataService) { }

  ngOnInit(): void {
    this.tasksToOneGoal = this.lol.getData();

  }

}
