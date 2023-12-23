import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../data/post.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { Post } from '../models/Post';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent implements OnInit {
  @ViewChild(IonInfiniteScroll)
  infiniteScroll!: IonInfiniteScroll;

  allLoadedPosts: Post[] = [];
  numberOfPosts = 7;
  skipPosts = 0;

  constructor(private readonly _postService: PostService) {}

  ngOnInit() {
    this.getPosts(false, '');
  }

  getPosts(isInitialLoad: boolean, event: any) {
    if (this.skipPosts === 21) {
      event.target.disabled = true;
    }

    this._postService
      .getSelectedPosts(this.numberOfPosts, this.skipPosts)
      .subscribe(
        (posts: Post[]) => {
          for (let i = 0; i < posts.length; i++) {
            this.allLoadedPosts.push(posts[i]);
          }

          if (isInitialLoad) event.target.complete();
          this.skipPosts = this.skipPosts + 7;
        },
        (error) => console.log(error)
      );
  }

  loadData(event: any) {
    this.getPosts(true, event);
  }
}
