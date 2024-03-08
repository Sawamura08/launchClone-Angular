import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollFunctionService {
  scrollSubject = new Subject<boolean>();
  scroll$ = this.scrollSubject.asObservable();

  homeScrollSubject = new Subject<boolean>();
  homeScroll$ = this.homeScrollSubject.asObservable();

  private handlingScroll = () => {
    window.addEventListener('scroll', () => {
      const isScrolled = window.scrollY > 0;
      this.scrollSubject.next(isScrolled);
    });
  };

  private handlingHomeScroll = () => {
    window.addEventListener('scroll', () => {
      const isHomeScrolled = window.scrollY > 100;
      this.homeScrollSubject.next(isHomeScrolled);
    });
  };
  constructor() {
    this.handlingScroll();
    this.handlingHomeScroll;
  }
}
