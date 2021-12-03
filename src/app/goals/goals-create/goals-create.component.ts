import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../shared/api.service';
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
  selector: 'app-goals-create',
  templateUrl: './goals-create.component.html',
  styleUrls: ['./goals-create.component.css']
})
export class GoalsCreateComponent implements OnInit{
  enteredValue = '';
  newPost = '';
  idDialog: any = '';
  data: Goals[] = [];
  isLoadingResults = true;
  goal: Goals = { id: '', description: '', order: '', userid: ''};
  user: Login = { id: '', username: '', password: '', firstname: '', surname: '', email: '', role: ''};
  description = '';
  id = '';
  dataTasks: Tasks[] = [];
  tasksToOneGoal: Tasks[] = [];
  dataUsers: Login[] = [];
  idloggedInUser: String = "";
  userID = JSON.stringify(this.user.id);


  @Input()
  @Input() goalsToOneUser: Goals[] = [];
  @Output() showTasksClicked = new EventEmitter<Tasks[]>();
  @Output() showGoalsClicked = new EventEmitter<Goals[]>();

  showTasksToOneGoal = false;
  showGoalsToOneUser = false;

  constructor(public dialog: MatDialog, private router: Router, private api: ApiService, private route: ActivatedRoute, private auth: AuthService,
             ) { }

  public position(): void {
    console.log('position aufgerufen');
    let position = 0;
    this.data.forEach((goal: Goals) => {
      position +=1;
      goal.order = String(position);
      this.api.updateGoalOrder(goal.id, goal).subscribe((data: Goals) => {
        console.log('neu positioniert');
      }, error => {
        console.log('hat nicht funktioniert');
      });
    });
  }

  drop(event: CdkDragDrop<Goals[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('bewegt oder?');
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

  onAddPost(id: any){
    this.isLoadingResults = true;
    const simpleObject = {} as Goals;
    simpleObject.description = this.enteredValue;
    simpleObject.userid=id;

    this.api.addGoal(simpleObject)
      .subscribe((res: any) => {
        this.isLoadingResults = false;
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
     window.location.reload()
  }

  showGoals(id: any){
    this.api.getGoalsToUser(id)
      .subscribe((res: any) => {
        console.log(res);
        this.goalsToOneUser = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });

    this.showGoalsToOneUser = true;
  }

  addTask(id: any){
    this.isLoadingResults = true;
    const simpleObject = {} as Tasks;
    simpleObject.description = "New Task For" +  id ;
    simpleObject.status= "todo";
    simpleObject.goalid=id;
    console.log(simpleObject);

    this.api.addTask(simpleObject)
      .subscribe((res: any) => {
        this.isLoadingResults = false;
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;

      });
    //window.location.reload()
  }

  showTasks(id: any){
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
  }

  onDeleteGoal(){
    this.newPost = this.enteredValue;
  }

  ngOnInit() {
    this.api.getGoals()
      .subscribe((res: any) => {
        this.data = res;
        this.isLoadingResults = false;
        this.data.sort((goal1, goal2) => {
          return Number(goal1.order)- Number(goal2.order);
        });
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });

      this.api.getTasks()
      .subscribe((res: any) => {
        this.dataTasks = res;
        this.isLoadingResults = false;

      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });

    this.api.getUsers()
      .subscribe((res: any) => {
        this.dataUsers = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });

    this.idloggedInUser = this.auth.getUserDetails().user_info._id;
    this.showGoals(this.idloggedInUser);
  }

  deleteDialog(id: any): void {
    this.idDialog= id;
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '40%',
      data :{'id': this.idDialog }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  getGoalDetails(id: any) : Goals{
    this.api.getGoal(id)
      .subscribe((data: any) => {
        this.goal = data;
        this.isLoadingResults = false;
      });
    return this.goal;
  }

  deleteGoal(id: any) {
    if(confirm("Are you sure you want to delete this goal?")) {
      this.isLoadingResults = true;
      this.api.deleteGoal(id)
        .subscribe(res => {
            this.isLoadingResults = false;
            this.router.navigate(['/articles']);
          }, (err) => {
            console.log(err);
            this.isLoadingResults = false;
          }
        );
      window.location.reload()
    }
  }

  openDialog(id: any): void {
    this.idDialog= id;
    const dialogRef = this.dialog.open(GoalsEditComponent, {
      width: '40%',
      data :{'id': this.idDialog, 'description': this.description}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  sendMessage() {
    // After Sending Message
    this.enteredValue = '';
  }
}

