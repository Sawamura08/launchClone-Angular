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

  windowSize = (): void => {
    const viewportWindow: number = window.innerWidth;

    if (viewportWindow < 780) {
      console.log("don't run");
    } else {
      console.log('run function');
    }
  };

  currentIndex: number = 0;
  slideComment = (current: number) => {
    this.currentIndex = current;
    const cards = this.el.nativeElement.querySelectorAll('.card');
    console.log(this.currentIndex);

    cards.forEach((card: any, index: number) => {
      this.renderer.setStyle(
        card,
        'transform',
        `translateX(-${this.currentIndex * 111}%)`
      );
    });
  };
}
