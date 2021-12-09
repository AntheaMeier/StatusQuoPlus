import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';
import {Goals} from "./goals";
import {Login} from "./login";
import { Review } from './review';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/goals';
const apiUrlLogin = 'http://localhost:3000/users';
const apiUrlOrder = 'http://localhost:3000/goals/order';
const apiUrlReviews = 'http://localhost:3000/reviews';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrlToken = 'http://localhost:3000/login';

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  //Login
  postTypeRequest(url:string, payload: any): any {
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
      tap((goal: Goals) => console.log(`added goal w/ id=${goal.id}`)),
      catchError(this.handleError<Goals>('addGoal'))
    );
  }

  deleteGoal(id: any): Observable<Goals> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Goals>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted article id=${id}`)),
      catchError(this.handleError<Goals>('deleteArticle'))
    );

  }

  updateGoal(id: any, article: Goals): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.patch(url, article, httpOptions).pipe(
      tap(_ => console.log(`updated goal id=${id}`)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  updateGoalOrder(id: any, goal: Goals): Observable<any> {
    const url = `${apiUrlOrder}/${id}`;
    return this.http.patch(url, goal, httpOptions).pipe(
      tap(_ => console.log(`updated goal order id=${id} und order=` + goal.order)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  getGoal(id: number): Observable<Goals> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Goals>(url).pipe(
      tap(_ => console.log(`fetched article id=${id}`)),
      catchError(this.handleError<Goals>(`getArticle id=${id}`))
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
