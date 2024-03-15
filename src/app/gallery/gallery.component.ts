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

  constructor(
    private galleries: GalleriesService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

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

  galleryAnim = (): void => {
    const pictures = this.el.nativeElement.querySelectorAll('img');
    console.log(pictures);

    let delay: number = 2000;
    pictures.forEach((pics: any, index: number) => {
      if (index % 2 == 0) {
        this.renderer.addClass(pics, 'fade-up');
        this.renderer.setAttribute(pics, 'data-aos-duration', '3000');
        this.renderer.setAttribute(pics, 'data-aos-delay', `${delay + 200}`);
      } else {
        this.renderer.addClass(pics, 'fade-down');
        this.renderer.setAttribute(pics, 'data-aos-duration', '3000');
        this.renderer.setAttribute(pics, 'data-aos-delay', `${delay + 200}`);
      }
    });
  };
}
