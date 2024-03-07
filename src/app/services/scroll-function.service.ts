import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollFunctionService {
  scrollSubject = new Subject<boolean>();
  scroll$ = this.scrollSubject.asObservable();

  private handlingScroll = () => {
    window.addEventListener('scroll', () => {
      const isScrolled = window.scrollY > 0;
      this.scrollSubject.next(isScrolled);
    });
  };
  constructor() {
    this.handlingScroll();
  }
}
