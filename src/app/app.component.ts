import {
  Component,
  ViewChild,
  ElementRef,
  Renderer2,
  OnInit,
  HostListener,
} from '@angular/core';
import { ScrollFunctionService } from './services/scroll-function.service';
import * as AOS from 'aos';

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
    setInterval(() => {
      this.slideBg('right');
    }, 5000);

    this.scrollNav();
    this.insertScrollAnimation();
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
      this.render.setStyle(nav, 'border-bottom', '2px solid #0592fd');
      this.render.setStyle(h3, 'color', 'black');
    } else if (this.isScrolled && !this.isChecked) {
      this.render.removeClass(linkWrapper, 'animation-links');
      this.render.setStyle(h3, 'color', 'black');
    } else {
      this.render.removeClass(linkWrapper, 'animation-links');
      this.render.setStyle(nav, 'background-color', 'transparent');
      this.render.removeStyle(nav, 'border-bottom');
      this.render.setStyle(h3, 'color', 'white');
    }
  };

  private scrollNav = () => {
    this.scrollService.scroll$.subscribe((isScrolled) => {
      this.isScrolled = isScrolled;
      if (isScrolled) {
        this.render.removeStyle(
          this.el.nativeElement.querySelector('.nav'),
          'background-color'
        );
        this.render.removeStyle(
          this.el.nativeElement.querySelector('.business'),
          'color'
        );
      }
    });
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

  smoothScroll(sectionId: string): void {
    const element = this.el.nativeElement.querySelector(`${sectionId}`);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
        offset: { top: -50, left: 0 },
      });
      const linkWrapper = this.el.nativeElement.querySelector('.link-wrapper');
      this.isChecked = !this.isChecked;
      const nav = this.el.nativeElement.querySelector('.nav');
      this.render.removeClass(linkWrapper, 'animation-links');
      this.render.removeStyle(nav, 'border-bottom');
    }
  }

  /* scroll animation Function */

  insertScrollAnimation = () => {
    const services = this.el.nativeElement.querySelectorAll('.services');
    const reasonPhoto = this.el.nativeElement.querySelector('.photo.wrapper');
    const reasonList = this.el.nativeElement.querySelector('.reason-wrapper');

    let delay: number = 400;
    services.forEach((service: any) => {
      this.render.setAttribute(service, 'data-aos-duration', '1000');
      this.render.setAttribute(service, 'data-aos-delay', `${(delay += 100)}`);
      this.render.setAttribute(service, 'data-aos', 'fade-up');
    });

    AOS.init();
  };
}
