import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';

register();

@Component({
  selector: 'app-product-carousal',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './product-carousal.component.html',
  styleUrl: './product-carousal.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductCarousalComponent implements OnInit, AfterViewInit {
  @ViewChild('swiper') swiperElement: ElementRef | undefined;

  right = faArrowRight;
  swiperConfig: any;
  slides: any[] = [];
  slidesPerView: number = 3; // Or any default value you prefer

  constructor() {
    const headings = [
      'Popular this month',
      'New arrivals',
      'Best sellers',
      'Featured items',
      'Special offers',
    ];
    const subheadings1 = [
      'Powered By',
      'Brought to you by',
      'Curated by',
      'Designed for',
      'Exclusive from',
    ];
    const subheadings2 = [
      'Uiverse',
      'TrendSetters',
      'StyleHub',
      'FashionForward',
      'DesignMasters',
    ];

    this.slides = Array(10)
      .fill(null)
      .map(() => ({
        heading: headings[Math.floor(Math.random() * headings.length)],
        subheading1:
          subheadings1[Math.floor(Math.random() * subheadings1.length)],
        subheading2:
          subheadings2[Math.floor(Math.random() * subheadings2.length)],
      }));
  }

  ngOnInit() {
    this.swiperConfig = {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      },
    };
  }

  ngAfterViewInit() {
    if (this.swiperElement) {
      Object.assign(this.swiperElement.nativeElement, this.swiperConfig);
      this.swiperElement.nativeElement.initialize();
    }
  }
}
