import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Goals } from '../shared/goals';
import { LoginData, LoginPayload, LoginResponse } from '../shared/loginData';
import { Tasks } from '../shared/tasks';
import { Review } from '../shared/review';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const apiUrl = 'http://localhost:3000/goals';
const apiUrlLogin = 'http://localhost:3000/users';
const apiUrlOrder = 'http://localhost:3000/goals/order';
const apiUrlTasks = 'http://localhost:3000/tasks';
const apiUrlStatus = 'http://localhost:3000/tasks/status';
const apiUrlTasksForGoal = 'http://localhost:3000/tasks/goal';
const apiUrlUsersForGoal = 'http://localhost:3000/goals/user';
const apiUrlReviews = 'http://localhost:3000/reviews';
const apiUrlTasksForStatus = 'http://localhost:3000/tasks/goal';
const apiUrlUsersForReview = 'http://localhost:3000/reviews/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrlToken = 'http://localhost:3000/login';

  // save and get your user data
  // todo: make an extra service for login or put this code and login method aka postTypeRequest to auth.service
  private loginDataSubject: BehaviorSubject<LoginData | undefined>;
  // use $ in name so you know that this is a stream/observable of data
  public loginData$: Observable<LoginData | undefined>;

  constructor(private http: HttpClient) {
    const loginDataFromStorage = localStorage.getItem('userData');
    this.loginDataSubject = new BehaviorSubject<LoginData | undefined>(
      loginDataFromStorage ? JSON.parse(loginDataFromStorage) : undefined
    );
    this.loginData$ = this.loginDataSubject.asObservable();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  //Login
  postTypeRequest(
    url: string,
    payload: LoginPayload
  ): Observable<LoginResponse> {
    // get your user information and token
    return this.http
      .post<LoginResponse>(`${this.apiUrlToken}${url}`, payload)
      .pipe(
        map((loginData) => {
          localStorage.setItem('userData', JSON.stringify(loginData.user_info));
          localStorage.setItem('token', JSON.stringify(loginData.access_token));
          this.loginDataSubject.next(loginData.user_info);
          return loginData;
        })
      );
  }

  // Users
  getUsers(): Observable<LoginData[]> {
    return this.http.get<LoginData[]>(apiUrlLogin).pipe(
      tap((goal) => console.log('fetched Users')),
      catchError(this.handleError('getUsers', []))
    );
  }

  getUser(id: any): Observable<LoginData> {
    const url = `${apiUrlLogin}/${id}`;
    return this.http.get<LoginData>(url).pipe(
      tap((_) => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<LoginData>(`getUser id=${id}`))
    );
  }

  // Goals
  addGoal(goal: Goals): Observable<Goals> {
    return this.http.post<Goals>(apiUrl, goal, httpOptions).pipe(
      tap((goal: Goals) => console.log(`added goal w/ id=${goal._id}`)),
      catchError(this.handleError<Goals>('addGoal'))
    );
  }

  deleteGoal(id: any): Observable<Goals> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Goals>(url, httpOptions).pipe(
      tap((_) => console.log(`deleted goal id=${id}`)),
      catchError(this.handleError<Goals>('deleteGoal'))
    );
  }

  updateGoal(id: any, goal: Goals): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.patch(url, goal, httpOptions).pipe(
      tap((_) => console.log(`updated goal id=${id}`)),
      catchError(this.handleError<any>('updateGoal'))
    );
  }

  updateGoalOrder(id: any, goal: Goals): Observable<any> {
    const url = `${apiUrlOrder}/${id}`;
    return this.http.patch(url, goal, httpOptions).pipe(
      tap((_) =>
        console.log(`updated goal order id=${id} und order=` + goal.order)
      ),
      catchError(this.handleError<any>('updateGoal'))
    );
  }

  getGoal(id: number): Observable<Goals> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Goals>(url).pipe(
      tap((_) => console.log(`fetched goal id=${id}`)),
      catchError(this.handleError<Goals>(`getArticle id=${id}`))
    );
  }

  getGoalsToUser(id: any): Observable<Goals[]> {
    return this.http.get<Goals[]>(`${apiUrlUsersForGoal}/${id}`).pipe(
      tap((goal) => console.log('fetched goals for user')),
      catchError(this.handleError('getUsersForGoal', []))
    );
  }

  // Tasks
  addTask(task: Tasks): Observable<Tasks> {
    return this.http.post<Tasks>(apiUrlTasks, task, httpOptions).pipe(
      tap((task: Tasks) => console.log(`added task w/ id=${task._id}`)),
      catchError(this.handleError<Tasks>('addTask'))
    );
  }

  deleteTask(id: any): Observable<Tasks> {
    const url = `${apiUrlTasks}/${id}`;
    return this.http.delete<Tasks>(url, httpOptions).pipe(
      tap((_) => console.log(`deleted task id=${id}`)),
      catchError(this.handleError<Tasks>('deleteTask'))
    );
  }

  getTask(id: number): Observable<Tasks> {
    const url = `${apiUrlTasks}/${id}`;
    return this.http.get<Tasks>(url).pipe(
      tap((_) => console.log(`fetched task id=${id}`)),
      catchError(this.handleError<Tasks>(`getArticle id=${id}`))
    );
  }

  updateTask(id: any, task: Tasks): Observable<any> {
    const url = `${apiUrlTasks}/${id}`;
    console.log(url);
    console.log(task);
    console.log(id);
    return this.http.patch(url, task, httpOptions).pipe(
      tap((_) => console.log(`updated task id=${id}`)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  getTodo(id: number): Observable<Tasks> {
    const url = `${apiUrlTasks}/${id}`;
    return this.http.get<Tasks>(url).pipe(
      tap((_) => console.log(`fetched task id=${id}`)),
      catchError(this.handleError<Tasks>(`getTask id=${id}`))
    );
  }

  getTasksToGoal(id: any): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${apiUrlTasksForGoal}/${id}`).pipe(
      tap((task) => console.log('fetched tasks for goal')),
      catchError(this.handleError('getTasksForGoal', []))
    );
  }

  getTasksToStatus(id: any, status: any): Observable<Tasks[]> {
    return this.http
      .get<Tasks[]>(`${apiUrlTasksForStatus}/${id}/${status}`)
      .pipe(
        tap((task) => console.log('fetched tasks to status')),
        catchError(this.handleError('getTasksToStatus', []))
      );
  }

  updateTaskStatus(id: any, task: Tasks): Observable<any> {
    const url = `${apiUrlStatus}/${id}`;
    return this.http.patch(url, task, httpOptions).pipe(
      tap((_) =>
        console.log(`updated task status id=${id} und status=` + task.status)
      ),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  // Reviews
  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(apiUrlReviews, review, httpOptions).pipe(
      tap((review: Review) => console.log(`added review w/ id=${review._id}`)),
      catchError(this.handleError<Review>('addReview'))
    );
  }

  deleteReview(id: any): Observable<Review> {
    const url = `${apiUrlReviews}/${id}`;
    return this.http.delete<Review>(url, httpOptions).pipe(
      tap((_) => console.log(`deleted review id=${id}`)),
      catchError(this.handleError<Review>('deleteReview'))
    );
  }

  updateReview(id: any, article: Review): Observable<any> {
    const url = `${apiUrlReviews}/${id}`;
    return this.http.patch(url, article, httpOptions).pipe(
      tap((_) => console.log(`updated review id=${id}`)),
      catchError(this.handleError<any>('updateReview'))
    );
  }

  getReviewsToUser(id: any): Observable<Review[]> {
    return this.http.get<Review[]>(`${apiUrlUsersForReview}/${id}`).pipe(
      tap((goal) => console.log('fetched reviews for user')),
      catchError(this.handleError('getUsersForReviews', []))
    );
  }

  getReview(id: number): Observable<Review> {
    const url = `${apiUrlReviews}/${id}`;
    return this.http.get<Review>(url).pipe(
      tap((_) => console.log(`fetched review id=${id}`)),
      catchError(this.handleError<Review>(`getReview id=${id}`))
    );
  }
}
