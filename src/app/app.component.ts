import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private el: ElementRef, private render: Renderer2) {}
  title = 'launchClone';

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
    } else {
      this.render.removeClass(linkWrapper, 'animation-links');
      this.render.setStyle(nav, 'background-color', 'transparent');
      this.render.setStyle(h3, 'color', 'white');
    }
  };

  /* slider background */

  slides: any[] = ['slide1', 'slide2', 'slide3'];
  currentIndex: any = 0;

  slideBg = (direction: string) => {
    this.currentIndex =
      direction === 'left'
        ? (this.currentIndex - 1 + this.slides.length) % this.slides.length
        : (this.currentIndex + 1) % this.slides.length;

    const wrapper = this.el.nativeElement.querySelectorAll('.slides');
    wrapper.forEach((wrap: any) => {
      this.render.setStyle(
        wrap,
        'transform',
        `translateX(-${this.currentIndex * 100}%)`
      );
    });

    console.log(this.currentIndex);
  };

  slideClasses = (index: number) => {
    return `${this.slides[index]}`;
  };
}
