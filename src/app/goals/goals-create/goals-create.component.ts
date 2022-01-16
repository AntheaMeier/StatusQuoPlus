import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Goals} from "../../shared/goals";
import {MatDialog} from '@angular/material/dialog';
import {Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {GoalsEditComponent} from "../goals-edit/goals-edit.component";
import {DeleteConfirmationDialogComponent} from '../delete-confirmation-dialog/delete-confirmation-dialog';
import {Tasks} from "../../shared/tasks";
import {Login} from "../../shared/login";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-goals',
  templateUrl: './goals-create.component.html',
  styleUrls: ['./goals-create.component.css']
})

export class GoalsCreateComponent implements OnInit {
  placeholder = "Benenne dein Ziel...";
  idDialog: any = '';
  editable = false;
  data: Goals[] = [];
  dataUser = {userid: '', selectedRole: ''};
  isLoadingResults = true;
  selectedGoal: Goals = {_id: '', description: '', order: '', userid: ''};
  @Output() showTasksClicked = new EventEmitter<Tasks[]>();
  @Output() showGoalsClicked = new EventEmitter<Goals[]>();
  description = '';
  id = '';
  dataTasks: Tasks[] = [];
  tasksToOneGoal: Tasks[] = [];

  user: Login = {id: '', username: '', password: '', firstname: '', surname: '', email: '', role: '', team: []};
  dataUsers: Login[] = [];
  idloggedInUser: String = "";
  userID = JSON.stringify(this.user.id);
  showTasksToOneGoal = false;
  showGoalsToOneUser = false;
  editableId: String = '';

  @Input() goalsToOneUser: Goals[] = [];
  @Input() idMember = "";
  @Input() selectedRole = "";

  //Tasks an todo schicken
  tasksToTodo: Tasks[] = [];
  tasksToDoing: Tasks[] = [];
  tasksToDone: Tasks[] = [];
  showGoalid = '';


  constructor(public dialog: MatDialog,
              private router: Router,
              private api: ApiService,
              private route: ActivatedRoute,
              private auth: AuthService,
  ) {
  }


  ngOnInit() {
    if(history.state.data != null) {
      this.dataUser = history.state.data;
      this.idMember = this.dataUser.userid;
      this.selectedRole = this.dataUser.selectedRole;
    }

    this.api.getUsers()
      .subscribe((res: any) => {
        this.dataUsers = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.idloggedInUser = this.auth.getUserDetails().user_info._id;
    if (this.idMember == "") {
      this.showGoals(this.idloggedInUser);
    } else {
      this.showGoals(this.idMember)
    }
    this.api.getGoalsToUser(this.idloggedInUser)
      .subscribe((res: any) => {
        this.goalsToOneUser = res;
        this.isLoadingResults = false;
        this.goalsToOneUser.sort((goal1, goal2) => {
          return Number(goal1.order) - Number(goal2.order);
        });
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });

  }

  public position(): void {
    let position = 0;
    this.goalsToOneUser.forEach((goal: Goals) => {
      position += 1;
      goal.order = String(position);
      this.api.updateGoalOrder(goal._id, goal).subscribe((data: Goals) => {
      }, error => {
      });
    });
  }

  drop(event: CdkDragDrop<Goals[]>) {
    if(this.selectedRole == 'Mitarbeiter_in') {
      if (event.previousContainer === event.container) {
        console.log('drop aufgerufen');
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        this.position();
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }
  }

  onAddPost(id: any) {
    if(this.selectedRole == 'Mitarbeiter_in') {
      this.isLoadingResults = true;
      const simpleObject = {} as Goals;
      simpleObject.description = this.placeholder;
      simpleObject.userid = id;
      this.api.addGoal(simpleObject)
        .subscribe((res: any) => {
          this.isLoadingResults = false;
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
      window.location.reload()
    }
  }

  showGoals(id: any) {
    this.api.getGoalsToUser(id)
      .subscribe((res: any) => {
        this.goalsToOneUser = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.showGoalsToOneUser = true;
  }

  showTasks(id: any) {
    this.api.getTasksToGoal(id)
      .subscribe((res: any) => {
        this.tasksToOneGoal = res;
        this.showTasksClicked.emit(this.tasksToOneGoal);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.showTasksToOneGoal = true;


    //TODO
    this.api.getTasksToStatus(id, 'todo')
      .subscribe((res: any) => {
        this.tasksToTodo = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });

    //DOING
    this.api.getTasksToStatus(id, 'doing')
      .subscribe((res: any) => {
        this.tasksToDoing = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });

    //DONE
    this.api.getTasksToStatus(id, 'done')
      .subscribe((res: any) => {
        this.tasksToDone = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });

  }

  deleteDialog(id: any): void {
    this.idDialog = id;
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '40%',
      data: {'id': this.idDialog}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }

  openDialog(id: any): void {
    this.idDialog = id;
    const dialogRef = this.dialog.open(GoalsEditComponent, {
      width: '40%',
      data: {'id': this.idDialog, 'description': this.description}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  getTheInput(e: any) {
    this.description = e.target.value;
  }

  updateAGoal(goal: Goals) {
      this.isLoadingResults = true;
      goal.description = this.description;
      this.api.updateGoal(goal._id, goal)
        .subscribe((res: any) => {
            this.isLoadingResults = false;
          }, (err: any) => {
            console.log(err);
            this.isLoadingResults = false;
          }
        );
      this.editable = false;
  }

  setTheSelectedGoal(goal: Goals) {
    this.selectedGoal = goal;
    this.editableId = goal._id;
  }

  setGoalsid(value: string) {
    this.showGoalid = value;
  }
}
