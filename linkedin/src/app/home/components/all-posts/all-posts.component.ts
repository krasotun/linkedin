import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { PostService } from '../../../data/post.service';
import { Post } from '../../../models/Post';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent implements OnInit, OnDestroy {
  private readonly _destroySubject = new Subject<boolean>();
  private readonly _postsSubject = new BehaviorSubject<Post[]>([]);
  private readonly _moreButtonSubject = new BehaviorSubject<boolean>(true);
  readonly isMoreButtonShown$ = this._moreButtonSubject
    .asObservable()
    .pipe(takeUntil(this._destroySubject));

  readonly postsToDisplay$ = this._postsSubject.asObservable();

  postsToLoad = 5;
  postsToSkip = 0;

  constructor(private readonly _postService: PostService) {}

  ngOnInit(): void {
    this._loadInitialPosts();
  }

  ngOnDestroy(): void {
    this._destroySubject.next(true);
  }

  private _loadInitialPosts(): void {
    this._postService
      .getSelectedPosts(this.postsToLoad, 0)
      .pipe(takeUntil(this._destroySubject))
      .subscribe((posts) => {
        this._postsSubject.next(posts);
      });
  }

  getMorePosts(): void {
    if (this.postsToSkip === 0) {
      this.postsToSkip = this.postsToSkip + 5;
    }

    this._postService
      .getCount()
      .pipe(
        switchMap((count) => {
          return this._postService
            .getSelectedPosts(this.postsToLoad, this.postsToSkip)
            .pipe(
              takeUntil(this._destroySubject),
              tap((newPosts) => {
                const currentPosts = this._postsSubject.getValue();
                const totalPosts = [...currentPosts, ...newPosts];
                this._postsSubject.next(totalPosts);
                this.postsToSkip = this.postsToSkip + 5;
                if (totalPosts.length >= count) {
                  this._moreButtonSubject.next(false);
                }
              })
            );
        })
      )
      .subscribe();
  }
}
