import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Goals} from "./goals";



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/goals';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }


  getArticles(): Observable<Goals[]> {
    return this.http.get<Goals[]>(apiUrl)
      .pipe(
        tap(goal => console.log('fetched articles')),
        catchError(this.handleError('getGoals', []))
      );
  }

  addArticle(goal: Goals): Observable<Goals> {
    return this.http.post<Goals>(apiUrl, goal, httpOptions).pipe(
      tap((goal: Goals) => console.log(`added goal w/ id=${goal.id}`)),
      catchError(this.handleError<Goals>('addGoal'))
    );
  }

  getArticle(id: number): Observable<Goals> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Goals>(url).pipe(
      tap(_ => console.log(`fetched article id=${id}`)),
      catchError(this.handleError<Goals>(`getArticle id=${id}`))
    );
  }

  deleteArticle(id: any): Observable<Goals> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Goals>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted article id=${id}`)),
      catchError(this.handleError<Goals>('deleteArticle'))
    );
  }

  updateArticle(id: any, article: Goals): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, article, httpOptions).pipe(
      tap(_ => console.log(`updated article id=${id}`)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }
}


