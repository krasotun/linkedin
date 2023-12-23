import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, repeat, tap } from 'rxjs';
import { API_URL } from 'src/app/injection.tokens';
import { Post } from '../models/Post';

enum SELECTED_POSTS_PARAMS {
  TAKE = 'take',
  SKIP = 'skip',
}

@Injectable()
export class PostService {
  constructor(
    @Inject(API_URL)
    private readonly baseUrl: string,
    private readonly http: HttpClient
  ) {}

  private readonly _updateSubject = new Subject<void>();

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.baseUrl}/all`)
      .pipe(repeat({ delay: () => this._updateSubject }));
  }

  post(post: Post): Observable<Post> {
    return this.http
      .post<Post>(this.baseUrl, post)
      .pipe(tap(() => this._updateSubject.next()));
  }

  getSelectedPosts(take: number, skip: number): Observable<Post[]> {
    const params = new HttpParams()
      .set(SELECTED_POSTS_PARAMS.TAKE, take)
      .set(SELECTED_POSTS_PARAMS.SKIP, skip);
    return this.http.get<Post[]>(this.baseUrl, { params });
  }

  getCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
}
