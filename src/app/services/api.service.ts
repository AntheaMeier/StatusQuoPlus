import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, from, Observable, of, zip } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, concatMap, map, mergeMap, tap, toArray } from 'rxjs/operators';
import { Goals } from '../models/goals';
import { LoginData, LoginPayload, LoginResponse } from '../models/loginData';
import { Tasks } from '../models/tasks';
import { Review } from '../models/review';
import { Feedback } from '../models/feedback';
import { Mood } from '../models/mood';
import { User } from '../models/user';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
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
const apiUrlFeedback = 'http://localhost:3000/feedback';
const apiUrlMood = 'http://localhost:3000/mood';
const apiUrlFeedbackForUser = 'http://localhost:3000/feedback/receiver';
const apiUrlMoodTracker = 'http://localhost:3000/mood';
const apiUrlMoodForUser = 'http://localhost:3000/mood/user';



@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrlToken = 'http://localhost:3000/login';
  private loginDataSubject: BehaviorSubject<LoginData | undefined>;
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
      catchError(this.handleError('getUsers', []))
    );
  }

  getUser(id: any): Observable<LoginData> {
    const url = `${apiUrlLogin}/${id}`;
    return this.http.get<LoginData>(url).pipe(
      catchError(this.handleError<LoginData>(`getUser id=${id}`))
    );
  }

  getUserName(id: string): Observable<any> {
    const url = `${apiUrlLogin}/${id}`;
    return this.http.get<LoginData>(url).pipe(
      map( res => {
            return res.firstname + ' ' + res.surname
        }
      )
    )
  }

  // Goals
  addGoal(goal: Goals): Observable<Goals> {
    return this.http.post<Goals>(apiUrl, goal, httpOptions).pipe(
      catchError(this.handleError<Goals>('addGoal'))
    );
  }

  deleteGoal(id: any): Observable<Goals> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Goals>(url, httpOptions).pipe(
      catchError(this.handleError<Goals>('deleteGoal'))
    );
  }

  updateGoal(id: any, goal: Goals, removeExpiryDate: boolean): Observable<any> {
    const url = `${apiUrl}/${id}/${removeExpiryDate}`;
    return this.http.patch(url, goal, httpOptions).pipe(
      catchError(this.handleError<any>('updateGoal'))
    );
  }

  updateGoalPriority(id: any, goal: Goals): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.patch(url, goal, httpOptions).pipe(
      catchError(this.handleError<any>('updateGoal'))
    );
  }

  getGoal(id: number): Observable<Goals> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Goals>(url).pipe(
      catchError(this.handleError<Goals>(`getArticle id=${id}`))
    );
  }

  getGoalsToUser(id: any, completed: boolean): Observable<Goals[]> {
    return this.http.get<Goals[]>(`${apiUrlUsersForGoal}/${id}/${completed}`).pipe(
      catchError(this.handleError('getUsersForGoal', []))
    );
  }

  // Tasks
  addTask(task: Tasks): Observable<Tasks> {
    return this.http.post<Tasks>(apiUrlTasks, task, httpOptions).pipe(
      catchError(this.handleError<Tasks>('addTask'))
    );
  }

  deleteTask(id: any): Observable<Tasks> {
    const url = `${apiUrlTasks}/${id}`;
    return this.http.delete<Tasks>(url, httpOptions).pipe(
      catchError(this.handleError<Tasks>('deleteTask'))
    );
  }

  getTask(id: number): Observable<Tasks> {
    const url = `${apiUrlTasks}/${id}`;
    return this.http.get<Tasks>(url).pipe(
      catchError(this.handleError<Tasks>(`getArticle id=${id}`))
    );
  }

  updateTask(id: any, task: Tasks): Observable<any> {
    const url = `${apiUrlTasks}/${id}`;
    return this.http.patch(url, task, httpOptions).pipe(
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  getTodo(id: number): Observable<Tasks> {
    const url = `${apiUrlTasks}/${id}`;
    return this.http.get<Tasks>(url).pipe(
      catchError(this.handleError<Tasks>(`getTask id=${id}`))
    );
  }

  getTasksToGoal(id: any): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${apiUrlTasksForGoal}/${id}`).pipe(
      catchError(this.handleError('getTasksForGoal', []))
    );
  }

  getTasksToStatus(id: any, status: any): Observable<Tasks[]> {
    return this.http
      .get<Tasks[]>(`${apiUrlTasksForStatus}/${id}/${status}`)
      .pipe(
        catchError(this.handleError('getTasksToStatus', []))
      );
  }

  updateTaskStatus(id: any, task: Tasks): Observable<any> {
    const url = `${apiUrlStatus}/${id}`;
    return this.http.patch(url, task, httpOptions).pipe(
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  // Reviews
  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(apiUrlReviews, review, httpOptions).pipe(
      catchError(this.handleError<Review>('addReview'))
    );
  }

  deleteReview(id: any): Observable<Review> {
    const url = `${apiUrlReviews}/${id}`;
    return this.http.delete<Review>(url, httpOptions).pipe(
      catchError(this.handleError<Review>('deleteReview'))
    );
  }

  updateReview(id: any, article: Review): Observable<any> {
    const url = `${apiUrlReviews}/${id}`;
    return this.http.patch(url, article, httpOptions).pipe(
      catchError(this.handleError<any>('updateReview'))
    );
  }

  getReviewsToUser(id: any): Observable<Review[]> {
    return this.http.get<Review[]>(`${apiUrlUsersForReview}/${id}`).pipe(
      catchError(this.handleError('getUsersForReviews', []))
    );
  }

  getReview(id: number): Observable<Review> {
    const url = `${apiUrlReviews}/${id}`;
    return this.http.get<Review>(url).pipe(
      catchError(this.handleError<Review>(`getReview id=${id}`))
    );
  }

  // Feedbacks
  addFeedback(feedback: Feedback): Observable<Feedback> {
    console.log(feedback);
    return this.http.post<Feedback>(apiUrlFeedback, feedback, httpOptions).pipe(
      catchError(this.handleError<Feedback>('addFeedback'))
    );
  }

  getFeedbackForUser(id: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${apiUrlFeedbackForUser}/${id}`).pipe(
      catchError(this.handleError<Feedback[]>('getFeedbackForUser', []))
    );
  }

  getAllFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(apiUrlFeedback).pipe(
      catchError(this.handleError<Feedback[]>('getFeedback'))
    );
  }

  getFeedbackWithName(id: string): Observable<any> {
    return this.getFeedbackForUser(id).pipe(
      mergeMap(feedbacks => forkJoin(
        feedbacks.map(f =>
          this.getUserName(f.provider_id).pipe(
            map(name => {
              f.provider_name = name;
              return f;
            })
          ))
      ))
    )
  }

  // Mood Tracker
  trackMood(mood: Mood): Observable<Mood> {
    return this.http.post<Mood>(apiUrlMoodTracker, mood, httpOptions).pipe(
      catchError(this.handleError<Mood>('trackMood'))
    );
  }

  getMoodForUser(id: string): Observable<Mood[]> {
    return this.http.get<Mood[]>(`${apiUrlMoodForUser}/${id}`).pipe(
      catchError(this.handleError<Mood[]>('getMoodForUser', []))
    );
  }

  getSingleMood(id: string): Observable<Mood> {
    const url = `${apiUrlMood}/${id}`;
    return this.http.get<Mood>(url).pipe(
      catchError(this.handleError<Mood>(`getArticle id=${id}`))
    );
  }
}
