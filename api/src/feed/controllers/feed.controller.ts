import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FeedPost } from '../models/post.interface';
import { FeedService } from '../services/feed.service';
import { Observable, from } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post()
  create(@Body() feedPost: FeedPost): Observable<FeedPost> {
    return this.feedService.createPost(feedPost);
  }

  @Get('all')
  findAll(): Observable<FeedPost[]> {
    return this.feedService.findAllPosts();
  }

  @Get('count')
  getCount(): Observable<number> {
    return this.feedService.getCount();
  }

  @Get()
  findSelected(
    @Query('take') take: number = 1,
    @Query('skip') skip: number = 1,
  ): Observable<FeedPost[]> {
    take = take > 20 ? 20 : take;
    return this.feedService.findPosts(take, skip);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() feedPost: FeedPost,
  ): Observable<UpdateResult> {
    return this.feedService.updatePost(id, feedPost);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.feedService.deletePost(id);
  }
}
