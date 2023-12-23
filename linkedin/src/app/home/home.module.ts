import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { AdvertisingComponent } from './components/advertising/advertising.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { HeaderComponent } from './components/header/header.component';
import { PopoverComponent } from './components/header/popover/popover.component';
import { ProfileSummaryComponent } from './components/profile-summary/profile-summary.component';
import { ModalComponent } from './components/start-post/modal/modal.component';
import { StartPostComponent } from './components/start-post/start-post.component';
import { HomePageRoutingModule } from './home-routing.module';
import { DataModule } from '../data/data.module';
import { API_URL } from '../injection.tokens';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    DataModule,
  ],
  declarations: [
    HomePage,
    HeaderComponent,
    PopoverComponent,
    ProfileSummaryComponent,
    StartPostComponent,
    AdvertisingComponent,
    ModalComponent,
    AllPostsComponent,
  ],
})
export class HomePageModule {}
