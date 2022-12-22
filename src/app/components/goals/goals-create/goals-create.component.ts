import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
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
import { DateAdapter } from '@angular/material/core';
import { GoalCompletedDialogComponent } from '../goal-completed-dialog/goal-completed-dialog.component';

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
  userID = JSON.stringify(this.user.id);
  idDialog: any = '';
  tasksToOneGoal: Tasks[] = [];
  editableId: String = '';
  selectedGoal: Goals = {_id: '', description: '', userid: '', priority: false, expiry_date: new Date(),  completed: false};
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

  dates: String[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private api: ApiService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>) {
      this.dateAdapter.setLocale('de');
  }

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.idls = localStorage.getItem('selectedGoal');
    this.goalSelectedReload = localStorage.getItem('selectedGoal');

    if (this.goalSelectedReload) this.setGoalsid(this.goalSelectedReload);
    this.idloggedInUser = this.auth.getUserDetails()._id;

    if (history.state.data != null) {
      this.dataUser = history.state.data;
      this.idMember = this.dataUser.userid;
      this.selectedRole = this.dataUser.selectedRole;
    }

    if (this.currentUrl == '/') {
      this.showTasks(this.goalSelectedReload);
      this.selectedRole = 'Mitarbeiter_in';
      this.showGoals(this.idloggedInUser);
      this.showGoalid = '';
    } else {
      this.showGoalid = '';
      this.idMember = this.route.snapshot.paramMap.get('id');
      this.showGoals(this.idMember);
    }
  }

  async fillProgressArray() {
    this.progressArray = [];
    for (let item of this.goalsToOneUser) {
      let second = await this.getNumberAllTasks(item._id);
      const first = await this.getNumberAllTasksDone(item._id);
      second = await this.getNumberAllTasks(item._id);
      this.progress = (first / second) * 100;
      this.progressArray.push(this.progress);
      if (second == first && second > 0) {
        this.setGoalCompleted(item);
      }
    }
  }

  setGoalCompleted(goal: Goals) {
    goal.completed = true;
    this.api.updateGoal(goal._id, goal, false).subscribe(
      (res) => {
        this.openGoalCompletedDialog(goal._id, goal.description);
      },
      (error) => {
        console.log(error);
      });

  }

  async getNumberAllTasks(goalid: String): Promise<number> {
    const res = await this.api.getTasksToGoal(goalid).toPromise();
    return res.length;
  }

  async getNumberAllTasksDone(goalid: String): Promise<number> {
    const res = await this.api.getTasksToStatus(goalid, 'done').toPromise();
    return res.length;
  }

  showGoals(id: any) {
    this.fillGoalsArray(id);
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
    if(this.enteredExpiryDate){
      simpleObject.expiry_date = new Date(this.enteredExpiryDate);
    }
    simpleObject.completed = false;

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
    this.api.updateGoal(id, this.goalForm.value, false).subscribe(
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
      data: {id: this.idDialog, description: this.description, expiry_date: this.enteredExpiryDate},
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  openGoalCompletedDialog(id: any, desc: string): void {
    this.idDialog = id;
    const dialogRef = this.dialog.open(GoalCompletedDialogComponent, {
      width: '50%',
      data: {id: this.idDialog, description: desc},
    });
    dialogRef.afterClosed().subscribe((result) => {
      window.location.reload();
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

  loadProgressNew($event: boolean) {}

  isVorgesetzte_r(): boolean {
    this.currentUrl = this.router.url;
    if (this.currentUrl != '/') {
      return true;
    }
    return this.selectedRole == 'Vorgesetzte_r';
  }

  calculate(expiryDate: Date): string {
    if(expiryDate) {
      let date2 = new Date(expiryDate);
      let date1 = new Date();
      let time = date2.getTime() - date1.getTime();
      let days = (time / (1000 * 3600 * 24)) + 1 ; //Difference in Days*/
      if(days <= 30 && days > 7){
        return 'yellow';
      } else if(days <= 7) {
        return 'red';
      }
      return '';
    } else {
      return '';
    }
  }

  setPriorityTag(_id: string, goal: Goals) {
    if(!goal.priority) {
      goal.priority = true;
    } else {
      goal.priority = false;
    }
    this.api.updateGoal(_id, goal, false)
      .subscribe((res: any) => {
          this.isLoadingResults = false;
          this.fillGoalsArray(this.idloggedInUser);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  fillGoalsArray(id: string): void{
    this.api.getGoalsToUser(id, false).subscribe(
      (res: any) => {
        this.goalsToOneUser = [];
        this.goalsToOneUser = res;
        this.isLoadingResults = false;
        this.goalsToOneUser.sort(function(a,b) {
          if (!a.expiry_date) {
            return 1;
          }
          if (!b.expiry_date) {
            return -1;
          }
          let date1 = new Date(a.expiry_date);
          let date2 = new Date(b.expiry_date);
          return date1.getTime() - date2.getTime();
        });

        this.goalsToOneUser.sort(function(x, y) {
          // true values first
          return (x.priority === y.priority)? 0 : x.priority ? -1 : 1;
          // false values first
          // return (x === y)? 0 : x? 1 : -1;
        });
        this.fillProgressArray();
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
