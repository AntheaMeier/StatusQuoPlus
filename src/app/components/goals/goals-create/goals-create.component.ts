import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {Goals} from '../../../models/goals';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {DeleteConfirmationDialogComponent} from '../delete-confirmation-dialog/delete-confirmation-dialog';
import {Tasks} from '../../../models/tasks';
import {LoginData, Role} from '../../../models/loginData';
import {AuthService} from '../../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {GoalsEditComponent} from '../goals-edit/goals-edit.component';

@Component({
  selector: 'app-goals',
  templateUrl: './goals-create.component.html',
  styleUrls: ['./goals-create.component.css'],
})
export class GoalsCreateComponent implements OnInit {
  editable = false;
  data: Goals[] = [];
  dataUser = {userid: '', selectedRole: ''};
  enteredExpiryDate!: string;
  isLoadingResults = true;
  description = '';
  id = '';
  dataTasks: Tasks[] = [];
  addPost = false;
  enteredContent = '';
  lel: any = '';
  goal: Goals = {_id: '', description: '', order: '', userid: '', expiry_date: ''};
  /* expiry_date hinzugefügt in Zeile drüber und in Zeile 51 */

  user: LoginData = {
    id: '',
    username: '',
    password: '',
    firstname: '',
    surname: '',
    email: '',
    role: Role.Employee,
    team: [],
  };
  dataUsers: LoginData[] = [];
  idloggedInUser: any = '';
  userID = JSON.stringify(this.user.id);
  idDialog: any = '';
  tasksToOneGoal: Tasks[] = [];
  editableId: String = '';
  selectedGoal: Goals = {_id: '', description: '', order: '', userid: '', expiry_date: ''};
  showTasksToOneGoal = false;
  newTask: Tasks = {goalid: '', _id: '', description: '', status: ''};
  deleteTodo: String = '';
  decision: String = 'yes';

  idls: any = '';
  refreshGoals$ = new BehaviorSubject<boolean>(true);

  @Input() goalsToOneUser: Goals[] = [];
  @Input() idMember: any = '';
  @Input() selectedRole = '';
  @Output() showTasksClicked = new EventEmitter<Tasks[]>();
  @Output() showGoalsClicked = new EventEmitter<Goals[]>();

  progress: number = 0;
  progressArray: number[] = [];
  showGoalsToOneUser = false;
  goalSelectedReload: any = '';
  tasksToTodo: Tasks[] = [];
  tasksToDoing: Tasks[] = [];
  hehe: boolean = true;
  tasksToDone: Tasks[] = [];
  showGoalid = '';
  resid: String = '';
  reso: number = 0;
  rest: number = 0;
  currentUrl = '';
  allTasksLength: number = 99;
  allTasksDoneLength: number = 99;

  goalForm: FormGroup = this.formBuilder.group({
    description: this.formBuilder.control('initial value', Validators.required),
  });

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private api: ApiService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.idls = localStorage.getItem('selectedGoal');
    const element = document.getElementById('1');
    this.goalSelectedReload = localStorage.getItem('selectedGoal');

    if (this.goalSelectedReload) this.setGoalsid(this.goalSelectedReload);

    if (this.currentUrl == '/') {
      this.showTasks(this.goalSelectedReload);
    } else {
      this.showGoalid = '';
    }

    this.progressArray = [];
    console.log('current url ' + this.currentUrl);

    if (this.currentUrl == '/') {
      this.selectedRole = 'Mitarbeiter_in';
    }
    console.log('goals init');
    if (history.state.data != null) {
      this.dataUser = history.state.data;
      this.idMember = this.dataUser.userid;
      this.selectedRole = this.dataUser.selectedRole;
      console.log(
        'die aktuelle userid: ' +
        this.idMember +
        'und die Rolle: ' +
        this.selectedRole
      );
    }

    this.api.getUsers().subscribe(
      (res: any) => {
        this.dataUsers = res;
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
    this.idloggedInUser = this.auth.getUserDetails()._id;
    if (this.currentUrl == '/') {
      this.showGoals(this.idloggedInUser);
    } else {
      this.idMember = this.route.snapshot.paramMap.get('id');
      this.showGoals(this.idMember);
    }

    this.api.getGoalsToUser(this.idloggedInUser).subscribe(
      (res: any) => {
        this.goalsToOneUser = res;
        this.isLoadingResults = false;
        this.goalsToOneUser.sort((goal1, goal2) => {
          return Number(goal1.order) - Number(goal2.order);
        });
        this.fillProgressArray();
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  async fillProgressArray() {
    this.progressArray = [];
    let res = this.goalsToOneUser;
    for (let i = 0; i < res.length; i++) {
      this.getNumberAllTasks(res[i]._id);
      this.getNumberAllTasksDone(res[i]._id);
      let second = await this.getNumberAllTasks(res[i]._id);
      const first = await this.getNumberAllTasksDone(res[i]._id);
      second = await this.getNumberAllTasks(res[i]._id);
      this.progress = (first / second) * 100;
      this.progressArray.push(this.progress);
    }
  }

  async getNumberAllTasks(goalid: String): Promise<number> {
    const res = await this.api.getTasksToGoal(goalid).toPromise();
    return res.length;
  }

  async getNumberAllTasksDone(goalid: String): Promise<number> {
    const res = await this.api.getTasksToStatus(goalid, 'done').toPromise();
    return res.length;
  }

  public position(): void {
    let position = 0;
    this.goalsToOneUser.forEach((goal: Goals) => {
      position += 1;
      goal.order = String(position);
      this.api.updateGoalOrder(goal._id, goal).subscribe(
        (data: Goals) => {
        },
        (error) => {
        }
      );
    });
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      moveItemInArray(
        this.progressArray,
        event.previousIndex,
        event.currentIndex
      );
      this.position();
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  showGoals(id: any) {
    this.api.getGoalsToUser(id).subscribe(
      (res: any) => {
        this.goalsToOneUser = res;
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
    this.showGoalsToOneUser = true;
  }

  onAddPost(id: any) {
    if (this.selectedRole == 'Vorgesetzte_r') {
      id = this.idMember;
    }
    this.isLoadingResults = true;
    const simpleObject = {} as Goals;
    simpleObject.description = this.enteredContent;
    simpleObject.userid = id;
    simpleObject.order = '' + (this.goalsToOneUser.length + 1);
    simpleObject.expiry_date = this.enteredExpiryDate;

    this.api.addGoal(simpleObject).subscribe(
      (res: any) => {
        this.isLoadingResults = false;
      },
      (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
    this.addPost = false;
    window.location.reload();
  }

  addPostForm() {
    this.addPost = !this.addPost;
  }

  onFormSubmit(id: any) {
    this.isLoadingResults = true;
    this.api.updateGoal(id, this.goalForm.value).subscribe(
      (res: any) => {
        const id = res._id;
        console.log(id);
        this.isLoadingResults = false;
      },
      (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
    window.location.reload();
  }

  deleteDialog(id: any): void {
    this.idDialog = id;
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '50%',
      data: {id: this.idDialog},
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  showTasks(id: any) {
    this.api.getTasksToGoal(id).subscribe(
      (res: any) => {
        this.tasksToOneGoal = res;
        this.showTasksClicked.emit(this.tasksToOneGoal);
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
    this.showTasksToOneGoal = true;

    //TODO
    this.api.getTasksToStatus(id, 'todo').subscribe(
      (res: any) => {
        console.log(res);
        this.currentUrl = this.router.url;
        if (this.currentUrl != '/') {
          this.tasksToTodo = [];
        }
        this.tasksToTodo = res;

        if (this.currentUrl != '/' && this.idls == '') {
          this.tasksToTodo = [];
        }
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );

    //DOING
    this.api.getTasksToStatus(id, 'doing').subscribe(
      (res: any) => {
        this.tasksToDoing = res;
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );

    //DONE
    this.api.getTasksToStatus(id, 'done').subscribe(
      (res: any) => {
        this.tasksToDone = res;
        this.isLoadingResults = false;
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  openDialog(id: any): void {
    this.idDialog = id;
    const dialogRef = this.dialog.open(GoalsEditComponent, {
      width: '50%',
      data: {id: this.idDialog, description: this.description},
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  setEditableToTrue() {
    if (this.selectedRole == 'Mitarbeiter_in') {
      this.editable = true;
    }
  }

  setTheSelectedGoal(goal: Goals) {
    if (this.currentUrl == '/') {
      localStorage.setItem('selectedGoal', goal._id);
    }
    this.selectedGoal = goal;
    this.editableId = goal._id;
  }

  setGoalsid(value: string) {
    this.showGoalid = value;
  }

  setNewtask($event: Tasks) {
    this.newTask = $event;
  }

  deleteTask($event: String) {
    this.deleteTodo = $event;
  }

  setDecision($event: String) {
    this.decision = $event;
    if (this.decision == 'yes') {
      for (let i = 0; i < this.tasksToTodo.length; i++) {
        if (this.tasksToTodo[i]._id == this.deleteTodo) {
          if (i > -1) {
          }
        }
      }
    }
  }

  loadProgressNew($event: boolean) {
  }

  isVorgesetzte_r(): boolean {
    this.currentUrl = this.router.url;
    if (this.currentUrl != '/') {
      return true;
    }
    return this.selectedRole == 'Vorgesetzte_r';
  }
}
