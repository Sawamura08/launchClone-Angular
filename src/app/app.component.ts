import {
  Component,
  ViewChild,
  ElementRef,
  Renderer2,
  OnInit,
  HostListener,
} from '@angular/core';
import { ScrollFunctionService } from './services/scroll-function.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private el: ElementRef,
    private render: Renderer2,
    private scrollService: ScrollFunctionService
  ) {}
  title = 'launchClone';
  isScrolled: boolean = false;
  ngOnInit(): void {
    /* setInterval(() => {
      this.slideBg('right');
    }, 5000); */

    this.scrollService.scroll$.subscribe((isScrolled) => {
      this.isScrolled = isScrolled;
    });
  }

  isChecked: boolean = false;

  menuBar = () => {
    const linkWrapper = this.el.nativeElement.querySelector('.link-wrapper');
    const nav = this.el.nativeElement.querySelector('.nav');
    const h3 = this.el.nativeElement.querySelector('.business');
    this.isChecked = !this.isChecked;
    if (this.isChecked) {
      this.render.addClass(linkWrapper, 'animation-links');
      this.render.setStyle(nav, 'background-color', 'white');
      this.render.setStyle(h3, 'color', 'black');
    } else if (this.isScrolled) {
      this.render.removeClass(linkWrapper, 'animation-links');
      this.scrollService.scroll$.subscribe((isScrolled) => {
        this.isScrolled = isScrolled;
      });
      console.log(this.isScrolled);
    } else {
      this.render.removeClass(linkWrapper, 'animation-links');
      this.render.setStyle(nav, 'background-color', 'transparent');
      this.render.setStyle(h3, 'color', 'white');
    }
  };

  /* slider background */

  slides: number = 3;
  currentIndex: any = 0;

  slideBg = (direction: string) => {
    this.currentIndex =
      direction === 'left'
        ? (this.currentIndex - 1 + this.slides) % this.slides
        : (this.currentIndex + 1) % this.slides;
    const wrapper = this.el.nativeElement.querySelectorAll('.slides');

    wrapper.forEach((wrap: any) => {
      this.render.setStyle(
        wrap,
        'transform',
        `translateX(-${this.currentIndex * 100}%)`
      );
    });
  };
}
