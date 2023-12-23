import { Component, OnInit } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { ModalController } from '@ionic/angular';
import { PostService } from 'src/app/data/post.service';

@Component({
  selector: 'app-start-post',
  templateUrl: './start-post.component.html',
  styleUrls: ['./start-post.component.scss'],
})
export class StartPostComponent implements OnInit {
  constructor(
    private readonly _postService: PostService,
    public modalController: ModalController
  ) {}

  ngOnInit() {}
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'my-custom-class2',
    });

    await modal.present();
    const { data, role } = await modal.onDidDismiss();

    this._postService.post(data.post).subscribe();
  }
}
