import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
})
export class GoalsComponent implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.starIcons();

    this.windowSize();
  }

  starIcons = (): void => {
    const stars = this.el.nativeElement.querySelectorAll('.stars');

    stars.forEach((star: any) => {
      if (star.querySelectorAll('fa-star').length === 0) {
        for (let i = 1; i <= 5; i++) {
          const icon = document.createElement('i');
          icon.classList.add('fa-solid');
          icon.classList.add('fa-star');
          star.appendChild(icon);
        }
      }
    });
  };

  currentIndex: number = 0;

  slideComment = (current: number) => {
    this.currentIndex = current;
    const cards = this.el.nativeElement.querySelectorAll('.card');
    const icons = this.el.nativeElement.querySelectorAll('.fa-circle');
    const translateVal =
      this.el.nativeElement.querySelector('.cards-wrapper').offsetWidth;
    console.log(translateVal);
    cards.forEach((card: any, index: number) => {
      const icon = icons[index];

      if (index === this.currentIndex) {
        this.renderer.setStyle(icon, 'color', '#0592fd');
      } else {
        this.renderer.setStyle(icon, 'color', '#ccc');
      }
      this.renderer.setStyle(
        card,
        'transform',
        `translateX(-${this.currentIndex * translateVal}px)`
      );
    });
  };

  testimonyAnim = () => {
    console.log('goods');
    const cards = this.el.nativeElement.querySelectorAll('.card');
    let delay: number = 100;
    cards.forEach((card: any, index: number) => {
      this.renderer.setAttribute(card, 'data-aos', 'fade-up');
      this.renderer.setAttribute(card, 'data-aos-duration', '1000');
      this.renderer.setAttribute(card, 'data-aos-delay', `${(delay += 250)}`);
    });
  };

  windowSize = (): void => {
    const viewportWindow: number = window.innerWidth;

    if (viewportWindow < 768) {
      /* setInterval(() => {
        this.slideComment(this.currentIndex);
        if (this.currentIndex < 2) {
          this.currentIndex++;
        } else {
          this.currentIndex = 0;
        }
      }, 7000); */

      console.log('goods');
    } else {
      this.testimonyAnim();
      console.log('dont run function');
    }
  };
}
