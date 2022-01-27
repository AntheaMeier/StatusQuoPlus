import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Goals} from "../../shared/goals";
import {MatDialog} from '@angular/material/dialog';
import {Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {DeleteConfirmationDialogComponent} from '../delete-confirmation-dialog/delete-confirmation-dialog';
import {Tasks} from "../../shared/tasks";
import {Login} from "../../shared/login";
import {AuthService} from "../../services/auth.service";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-goals',
  templateUrl: './goals-create.component.html',
  styleUrls: ['./goals-create.component.css']
})

export class GoalsCreateComponent implements OnInit {
  editable = false;
  data: Goals[] = [];
  dataUser = {userid: '', selectedRole: ''};
  isLoadingResults = true;
  description = '';
  id = '';
  dataTasks: Tasks[] = [];
  addPost = false;
  enteredContent = "";
  edit = false;
  user: Login = {id: '', username: '', password: '', firstname: '', surname: '', email: '', role: '', team: []};
  dataUsers: Login[] = [];
  idloggedInUser: String = "";
  userID = JSON.stringify(this.user.id);
  idDialog: any = '';
  tasksToOneGoal: Tasks[] = [];
  editableId: String = '';
  selectedGoal: Goals = {_id: '', description: '', order: '', userid: ''};
  showTasksToOneGoal = false;

  @Input() goalsToOneUser: Goals[] = [];
  @Input() idMember = "";
  @Input() selectedRole = "";
  @Output() showTasksClicked = new EventEmitter<Tasks[]>();
  @Output() showGoalsClicked = new EventEmitter<Goals[]>();

  //Tasks an todo schicken
  tasksToTodo: Tasks[] = [];
  tasksToDoing: Tasks[] = [];
  tasksToDone: Tasks[] = [];
  showGoalid = '';

  goalForm: FormGroup = this.formBuilder.group({
    description: this.formBuilder.control('initial value', Validators.required)
  });

  constructor(public dialog: MatDialog,
              private router: Router,
              private api: ApiService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    if (history.state.data != null) {
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
      if (this.selectedRole != "Vorgesetzte_r") {
        this.getGoalDetails(this.idloggedInUser);
      }
      if (this.selectedRole == "Vorgesetzte_r") {
        this.getGoalDetails(this.idMember);
        console.log('id member ' + this.idMember);
      }
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
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
    if (this.selectedRole == 'Mitarbeiter_in') {
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
    if (this.selectedRole == 'Vorgesetzte_r') {
      id = this.idMember
    }
    this.isLoadingResults = true;
    const simpleObject = {} as Goals;
    simpleObject.description = this.enteredContent;
    simpleObject.userid = id;
    this.api.addGoal(simpleObject)
      .subscribe((res: any) => {
        this.isLoadingResults = false;
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.reloadCurrentRoute();
    this.addPost = false;
    window.location.reload()
  }

  addPostForm() {
    this.addPost = !this.addPost;
  }

  getGoalDetails(id: any) {
    this.api.getGoalsToUser(id)
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
    this.showTasksToOneGoal = true;
  }

  onFormSubmit(id: any) {
    this.isLoadingResults = true;
    this.api.updateGoal(id, this.goalForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          console.log(id)
          this.isLoadingResults = false;
          // this.router.navigate(['/show-todo', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
    window.location.reload()
  }

  deleteDialog(id: any): void {
    console.log(id)
    this.idDialog = id;
    this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '40%',
      data: {'id': this.idDialog}
    });
  }

  editOnOff() {
    this.edit = !this.edit;
  }

  setGoalsid(value: string) {
    this.showGoalid = value;
  }

  setTheSelectedGoal(goal: Goals) {
    this.selectedGoal = goal;
    this.editableId = goal._id;
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
}
