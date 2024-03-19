import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { GalleriesService } from '../services/galleries.service';
import { Subscription } from 'rxjs';
import * as Aos from 'aos';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, OnDestroy {
  image: any;
  imageSubscription!: Subscription;

  constructor(private galleries: GalleriesService) {}

  ngOnInit(): void {
    this.imageSubscription = this.galleries.getImages().subscribe({
      next: (data) => {
        this.image = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.imageSubscription) this.imageSubscription.unsubscribe();
  }
}
