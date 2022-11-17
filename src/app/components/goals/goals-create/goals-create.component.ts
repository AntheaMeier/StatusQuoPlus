import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {Goals} from '../../../models/goals';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {DeleteConfirmationDialogComponent} from '../delete-confirmation-dialog/delete-confirmation-dialog';
import {Tasks} from '../../../models/tasks';
import {LoginData, Role} from '../../../models/loginData';
import {AuthService} from '../../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  isLoadingResults = true;
  description = '';
  id = '';
  addPost = false;
  enteredContent = '';

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
  idDialog: any = '';
  tasksToOneGoal: Tasks[] = [];
  editableId: String = '';
  selectedGoal: Goals = {_id: '', description: '', userid: '', priority: false};
  showTasksToOneGoal = false;
  newTask: Tasks = {goalid: '', _id: '', description: '', status: ''};
  deleteTodo: String = '';
  decision: String = 'yes';

  idls: any = '';

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
  tasksToDone: Tasks[] = [];
  showGoalid = '';
  currentUrl = '';

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
  ) {}

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.idls = localStorage.getItem('selectedGoal');
    this.goalSelectedReload = localStorage.getItem('selectedGoal');

    if (this.goalSelectedReload) this.setGoalsid(this.goalSelectedReload);

    if (this.currentUrl == '/') {
      this.showTasks(this.goalSelectedReload);
    } else {
      this.showGoalid = '';
    }

    this.progressArray = [];

    if (this.currentUrl == '/') {
      this.selectedRole = 'Mitarbeiter_in';
    }
    if (history.state.data != null) {
      this.dataUser = history.state.data;
      this.idMember = this.dataUser.userid;
      this.selectedRole = this.dataUser.selectedRole;
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

    this.fillGoalsArray();
    this.fillProgressArray();
  }

  fillProgressArray() {
    this.progressArray = [];
    let res = this.goalsToOneUser;
    for (let item of res) {
      let second = this.getNumberAllTasks(item._id);
      const first = this.getNumberAllTasksDone(item._id);
      this.progress = (first / second) * 100;
      this.progressArray.push(this.progress);
    }
  }

  getNumberAllTasks(goalid: String): number {
    this.api.getTasksToGoal(goalid).subscribe(res => {
      console.log(goalid + ' alle '+ res.length);
      return res.length;
    });
    return 0;
  }

  getNumberAllTasksDone(goalid: String): number {
    this.api.getTasksToStatus(goalid, 'done').subscribe(res => {
      console.log(goalid + ' done '+ res.length);
      return res.length;
    });
    return 0;
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
    simpleObject.priority = false;

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

  setPriorityTag(_id: string, goal: Goals) {
    if(!goal.priority) {
      goal.priority = true;
    } else {
      goal.priority = false;
    }
    this.api.updateGoalPriority(_id, goal)
      .subscribe((res: any) => {
          this.isLoadingResults = false;
          this.fillGoalsArray();
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  fillGoalsArray(): void{
    this.api.getGoalsToUser(this.idloggedInUser).subscribe(
      (res: any) => {
        this.goalsToOneUser = res;
        this.isLoadingResults = false;
        this.goalsToOneUser.sort(function(x, y) {
          // true values first
          return (x.priority === y.priority)? 0 : x.priority ? -1 : 1;
          // false values first
          // return (x === y)? 0 : x? 1 : -1;
        });
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}
