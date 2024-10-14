import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-top-rating',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './top-rating.component.html',
  styleUrl: './top-rating.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TopRatingComponent {
  star = faStar;
  heart = faHeart;
  slidesPerView: number = 4;
  screenWidth!: number;
  @HostListener('window:resize')
  getScreenWidth() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 320 && this.screenWidth <= 480) {
      this.slidesPerView = 1;
    } else if (this.screenWidth >= 480 && this.screenWidth <= 769) {
      this.slidesPerView = 2;
    } else if (this.screenWidth >= 769 && this.screenWidth <= 1024) {
      this.slidesPerView = 3;
    } else if (this.screenWidth >= 1024 && this.screenWidth <= 1440) {
      this.slidesPerView = 4;
    }
  }
}
