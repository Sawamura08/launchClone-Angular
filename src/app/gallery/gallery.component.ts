import { Component, OnInit, OnDestroy } from '@angular/core';
import { GalleriesService } from '../services/galleries.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, OnDestroy {
  image: any;

  constructor(
    private galleries: GalleriesService,
    private imageSubscription: Subscription
  ) {}

  ngOnInit(): void {
    this.imageSubscription = this.galleries.getImages().subscribe({
      next: (data) => {
        this.image = data;
        console.log(data);
      },
      error: (error) => {
        console.log('error' + error);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.imageSubscription) this.imageSubscription.unsubscribe();
  }
}
