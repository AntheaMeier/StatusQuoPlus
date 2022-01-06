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
  enteredValue = '';
  newPost = '';
  idDialog: any = '';
  editable = false;
  data: Goals[] = [];
  isLoadingResults = true;
  selectedGoal: Goals = {_id: '', description: '', order: '', userid: ''};
  @Output() showTasksClicked = new EventEmitter<Tasks[]>();
  @Output() showGoalsClicked = new EventEmitter<Goals[]>();
  description = '';
  id = '';
  dataTasks: Tasks[] = [];
  tasksToOneGoal: Tasks[] = [];
  @Output() showGoalid = new EventEmitter<string>();
  goal: Goals = {_id: '', description: '', order: '', userid: ''};
  user: Login = {id: '', username: '', password: '', firstname: '', surname: '', email: '', role: '', team: []};
  dataUsers: Login[] = [];
  idloggedInUser: String = "";
  userID = JSON.stringify(this.user.id);
  showTasksToOneGoal = false;
  showGoalsToOneUser = false;
  isSingleClick: Boolean = true;
  editableId: String = '';

  @Input() goalsToOneUser: Goals[] = [];
  @Input() idTeam = "";
  @Input() selectedRole: String = "Mitarbeiter_in";


  constructor(public dialog: MatDialog,
              private router: Router,
              private api: ApiService,
              private route: ActivatedRoute,
              private auth: AuthService,
  ) {
  }

  ngOnInit() {
    this.api.getUsers()
      .subscribe((res: any) => {
        this.dataUsers = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.idloggedInUser = this.auth.getUserDetails().user_info._id;
    if (this.idTeam == "") {
      this.showGoals(this.idloggedInUser);
    } else {
      this.showGoals(this.idTeam)
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
    this.api.getTasks()
      .subscribe((res: any) => {
        this.dataTasks = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  public position(): void {
    console.log('position aufgerufen ');
    let position = 0;
    this.goalsToOneUser.forEach((goal: Goals) => {
      console.log('vor api aufruf : ' + goal.order);
      position += 1;
      goal.order = String(position);
      this.api.updateGoalOrder(goal._id, goal).subscribe((data: Goals) => {
      }, error => {
      });
      console.log('nach api aufruf : ' + goal.order);
    });
  }

  drop(event: CdkDragDrop<Goals[]>) {
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

  onAddPost(id: any) {
    this.isLoadingResults = true;
    const simpleObject = {} as Goals;
    simpleObject.description = "Click to edit";
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

  setEditableToTrue() {
    if (this.selectedRole == 'Mitarbeiter_in') {
      this.editable = true;
    }
  }

  getTheInput(e: any) {
    this.description = e.target.value;
  }

  setTheSelectedGoal(goal: Goals) {
    this.selectedGoal = goal;
    this.editableId = goal._id;
  }

  setGoalsid(value: string) {
    this.showGoalid.emit(value);
  }



// für die Doppelklick-Funktion
  method1CallForClick(){
    this.isSingleClick = true;
    setTimeout(()=>{
      if(this.isSingleClick){
      }
    },250)
  }
  method2CallForDblClick(id: String){
    this.isSingleClick = false;
      this.setEditableToTrue()
  }

  isVorgesetzte_r() : boolean{
    return (this.selectedRole == 'Vorgesetzte_r');
  }

}
