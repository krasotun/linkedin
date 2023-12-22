import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../components/models/Post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private readonly http: HttpClient) {}

  getSelectedPosts(params: string): Observable<Post[]> {
    return this.http.get<any>('http://localhost:3000/api/feed' + params);
  }
}
