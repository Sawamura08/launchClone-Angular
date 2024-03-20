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
}
