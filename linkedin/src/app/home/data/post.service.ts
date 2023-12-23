import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Post } from '../components/models/Post';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/injection.tokens';

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

  getSelectedPosts(take: number, skip: number): Observable<Post[]> {
    const params = new HttpParams()
      .set(SELECTED_POSTS_PARAMS.TAKE, take)
      .set(SELECTED_POSTS_PARAMS.SKIP, skip);
    return this.http.get<Post[]>(this.baseUrl, { params });
  }
}
