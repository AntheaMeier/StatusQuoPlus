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
  @Input() tasksToOneGoal: Tasks[] = [];
  showData: boolean = false;

  constructor(private lol: TaskdataService) { }

  ngOnInit(): void {

  }


}
