import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    const contents = this.el.nativeElement.querySelectorAll('.content-wrapper');

    let delay: number = 0;
    contents.forEach((content: any, index: number) => {
      if (index % 2 == 0) {
        this.renderer.setAttribute(content, 'data-aos', 'fade-left');
        this.renderer.setAttribute(content, 'data-aos-duration', '1000');
        this.renderer.setAttribute(content, 'data-aos-delay', `${delay + 200}`);
      } else {
        this.renderer.setAttribute(content, 'data-aos', 'fade-right');
        this.renderer.setAttribute(content, 'data-aos-duration', '1000');
        this.renderer.setAttribute(content, 'data-aos-delay', `${delay + 200}`);
      }
    });
  }
}
