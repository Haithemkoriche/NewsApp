import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="slider-container">
      <div class="slider">
        <div
          *ngFor="let article of articles; let i = index"
          class="slide"
          [class.active]="i === currentSlideIndex"
        > 
          <img
            *ngIf="article.urlToImage"
            [src]="article.urlToImage"
            [alt]="article.title"
          />
          <div class="slider-caption">
            <h2>{{ article.title }}</h2>
            <p>{{ article.description }}</p>
          </div>
        </div>
      </div>
      <button class="slider-btn prev" (click)="prevSlide()">&#10094;</button>
      <button class="slider-btn next" (click)="nextSlide()">&#10095;</button>
    </div>
  `,
  styles: [`
    .slider-container {
      position: relative;
      width: 100%;
      height: 500px;
      overflow: hidden;
    }

    .slider {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
      visibility: hidden;
    }

    .slide.active {
      opacity: 1;
      visibility: visible;
      z-index: 10;
    }

    .slide img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .slider-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.5);
      color: white;
      padding: 15px;
    }

    .slider-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      padding: 10px;
      cursor: pointer;
    }

    .slider-btn.prev {
      left: 10px;
    }

    .slider-btn.next {
      right: 10px;
    }
  `]
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() articles: any[] = [];
  currentSlideIndex = 0;
  private slideInterval: any;

  ngOnInit() {
    // Auto-advance slides every 5 seconds
    this.startAutoSlide();
  }

  ngOnDestroy() {
    // Clear interval to prevent memory leaks
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  prevSlide() {
    this.currentSlideIndex =
      (this.currentSlideIndex - 1 + this.articles.length) % this.articles.length;
  }

  nextSlide() {
    this.currentSlideIndex =
      (this.currentSlideIndex + 1) % this.articles.length;
  }

  private startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }
}
