import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LandingSectionComponent } from './landing-section/landing-section.component';
import { VideoSectionComponent } from './video-section/video-section.component';
import { ProductCarousalComponent } from './product-carousal/product-carousal.component';
import { SecondSectionComponent } from './second-section/second-section.component';
import { ProductCarouselTwoComponent } from './product-carousel-two/product-carousel-two.component';
import { TopRatingComponent } from './top-rating/top-rating.component';
import { MapComponent } from './map/map.component';
import { FooterComponent } from './footer/footer.component';
import { MarqueeBrandsComponent } from './marquee-brands/marquee-brands.component';
import { HomeComponent } from "./home/home.component";
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    NavBarComponent,
    LandingSectionComponent,
    VideoSectionComponent,
    ProductCarousalComponent,
    SecondSectionComponent,
    ProductCarouselTwoComponent,
    TopRatingComponent,
    MapComponent,
    FooterComponent,
    MarqueeBrandsComponent,
    HomeComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'final-project';
  isStandalonePage: boolean = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.routerState.snapshot.root;
      this.isStandalonePage = currentRoute.firstChild?.data['standalone'] === true;
    });
  }
}
