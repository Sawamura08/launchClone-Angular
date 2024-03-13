import { Component, OnInit } from '@angular/core';
import { GalleriesService } from '../services/galleries.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  image: any;
  constructor(private galleries: GalleriesService) {}

  ngOnInit(): void {
    this.galleries.getImages().subscribe(
      (data) => {
        this.image = data;
        console.log(this.image);
      },
      (error) => {
        console.log('error');
      }
    );
  }
}
