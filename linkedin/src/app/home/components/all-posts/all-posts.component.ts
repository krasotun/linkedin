import { Component } from '@angular/core';
import { map } from 'rxjs';
import { PostService } from '../../../data/post.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent {
  readonly posts$ = this._postService
    .getPosts()
    .pipe(map((posts) => posts.reverse()));

  constructor(private readonly _postService: PostService) {}
}
