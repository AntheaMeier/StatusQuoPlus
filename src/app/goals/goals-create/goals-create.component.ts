import {Component} from '@angular/core';

@Component({
  selector: 'app-goals',
  templateUrl: './goals-create.component.html',
  styleUrls: ['./goals-create.component.css']
})
export class GoalsCreateComponent {
  enteredValue = '';
  newPost = '';

  onAddPost(){
    this.newPost = this.enteredValue;
  }

  onDeleteGoal(){
    this.newPost = this.enteredValue;
  }
}





