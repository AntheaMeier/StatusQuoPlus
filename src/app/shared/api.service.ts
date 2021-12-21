import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';
import {Goals} from "./goals";
import {Login} from "./login";
import {Tasks} from "./tasks";
import { Review } from './review';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/goals';
const apiUrlLogin = 'http://localhost:3000/users';
const apiUrlOrder = 'http://localhost:3000/goals/order';
const apiUrlTasks = 'http://localhost:3000/tasks';
const apiUrlStatus = 'http://localhost:3000/tasks/status';
const apiUrlTasksForGoal = 'http://localhost:3000/tasks/goal';
const apiUrlUsersForGoal = 'http://localhost:3000/goals/user';
const apiUrlReviews = 'http://localhost:3000/reviews';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrlToken = 'http://localhost:3000/login';

  constructor(private http: HttpClient) {
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  //Login
  postTypeRequest(url: string, payload: any): any {
    return this.http.post(`${this.apiUrlToken}${url}`, payload).pipe(map(res => {
      return res;
    }));
  }

  // Users
  getUsers(): Observable<Login[]> {
    return this.http.get<Login[]>(apiUrlLogin)
      .pipe(
        tap(goal => console.log('fetched Users')),
        catchError(this.handleError('getUsers', []))
      );
  }

  getUser(id: any): Observable<Login> {
    const url = `${apiUrlLogin}/${id}`;
    return this.http.get<Login>(url).pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<Login>(`getUser id=${id}`))
    );
  }

  // Goals
  getGoals(): Observable<Goals[]> {
    return this.http.get<Goals[]>(apiUrl)
      .pipe(
        tap(goal => console.log('fetched articles')),
        catchError(this.handleError('getGoals', []))
      );
  }

  addGoal(goal: Goals): Observable<Goals> {
    return this.http.post<Goals>(apiUrl, goal, httpOptions).pipe(
      tap((goal: Goals) => console.log(`added goal w/ id=${goal._id}`)),
      catchError(this.handleError<Goals>('addGoal'))
    );
  }

  deleteGoal(id: any): Observable<Goals> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Goals>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted goal id=${id}`)),
      catchError(this.handleError<Goals>('deleteGoal'))
    );

  }

  updateGoal(id: any, goal: Goals): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.patch(url, goal, httpOptions).pipe(
      tap(_ => console.log(`updated goal id=${id}`)),
      catchError(this.handleError<any>('updateGoal'))
    );
  }

  updateGoalOrder(id: any, goal: Goals): Observable<any> {
    const url = `${apiUrlOrder}/${id}`;
    return this.http.patch(url, goal, httpOptions).pipe(
      tap(_ => console.log(`updated goal order id=${id} und order=` + goal.order)),
      catchError(this.handleError<any>('updateGoal'))
    );
  }

  getGoal(id: number): Observable<Goals> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Goals>(url).pipe(
      tap(_ => console.log(`fetched article id=${id}`)),
      catchError(this.handleError<Goals>(`getArticle id=${id}`))
    );
  }

  getGoalsToUser(id: any): Observable<Goals[]> {
    return this.http.get<Goals[]>(`${apiUrlUsersForGoal}/${id}`)
      .pipe(
        tap(goal => console.log('fetched users for goal')),
        catchError(this.handleError('getUsersForGoal', []))
      );
  }

  // Tasks
  getTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(apiUrlTasks)
      .pipe(
        tap(task => console.log('fetched tasks')),
        catchError(this.handleError('getTasks', []))
      );
  }

  addTask(task: Tasks): Observable<Tasks> {
    return this.http.post<Tasks>(apiUrlTasks, task, httpOptions).pipe(
      tap((task: Tasks) => console.log(`added task w/ id=${task._id}`)),
      catchError(this.handleError<Tasks>('addTask'))
    );
  }

  deleteTask(id: any): Observable<Tasks> {
    const url = `${apiUrlTasks}/${id}`;
    return this.http.delete<Tasks>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted task id=${id}`)),
      catchError(this.handleError<Tasks>('deleteTask'))
    );
  }

  updateTask(id: any, task: Tasks): Observable<any> {
    const url = `${apiUrlTasks}/${id}`;
    return this.http.patch(url, task, httpOptions).pipe(
      tap(_ => console.log(`updated task id=${id}`)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  getTasksToGoal(id: any): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${apiUrlTasksForGoal}/${id}`)
      .pipe(
        tap(task => console.log('fetched tasks for goal')),
        catchError(this.handleError('getTasksForGoal', []))
      );
  }

  updateTaskStatus(id: any, task: Tasks): Observable<any> {
    const url = `${apiUrlStatus}/${id}`;
    console.log('api.service aufgerufen');
    return this.http.patch(url, task, httpOptions).pipe(
      tap(_ => console.log(`updated task status id=${id} und status=` + task.status)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  // Reviews
  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(apiUrlReviews, review, httpOptions).pipe(
      tap((review: Review) => console.log(`added review w/ id=${review.id}`)),
      catchError(this.handleError<Review>('addReview'))
    );
  }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(apiUrlReviews)
      .pipe(
        tap(review => console.log('fetched reviews')),
        catchError(this.handleError('getReviews', []))
      );
  }

  getReview(id: number): Observable<Review> {
    const url = `${apiUrlReviews}/${id}`;
    return this.http.get<Review>(url).pipe(
      tap(_ => console.log(`fetched review id=${id}`)),
      catchError(this.handleError<Review>(`getReview id=${id}`))
    );
  }

  deleteReview(id: any): Observable<Review> {
    const url = `${apiUrlReviews}/${id}`;
    return this.http.delete<Review>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted review id=${id}`)),
      catchError(this.handleError<Review>('deleteReview'))
    );
  }

  updateReview(id: any, article: Review): Observable<any> {
    const url = `${apiUrlReviews}/${id}`;
    return this.http.patch(url, article, httpOptions).pipe(
      tap(_ => console.log(`updated review id=${id}`)),
      catchError(this.handleError<any>('updateReview'))
    );
  }
}
