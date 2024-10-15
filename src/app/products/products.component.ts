import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from '../truncate.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faFilter } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/fontawesome-free-regular';
import { FakeStoreService } from '../fake-store.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, TruncatePipe, RouterModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  star = faStar;
  heart = faHeart;
  filter = faFilter;
  data: any[] = [];
  categories: string[] = [];
  sizes: string[] = [];
  colors: string[] = [];
  priceRange: { min: number; max: number } = { min: 0, max: 695 };

  selectedCategory: string = '';
  selectedSize: string = '';
  selectedColor: string = '';
  selectedPriceRange: number = 695;

  constructor(private fakeStoreService: FakeStoreService) {}

  async ngOnInit() {
    await this.loadInitialData();
    await this.applyFilters();
  }

  async loadInitialData() {
    this.categories = await this.fakeStoreService.getAllCategories();
    this.sizes = await this.fakeStoreService.getAvailableSizes();
    this.colors = await this.fakeStoreService.getAvailableColors();
    const fetchedPriceRange = await this.fakeStoreService.getPriceRange();
    this.priceRange = {
      min: Math.floor(fetchedPriceRange.min),
      max: Math.ceil(fetchedPriceRange.max)
    };
    this.selectedPriceRange = this.priceRange.max;
  }

  async applyFilters() {
    this.data = await this.fakeStoreService.getFilteredProducts(
      this.selectedCategory,
      0,
      this.selectedPriceRange
    );
  }

  async onCategoryChange() {
    await this.applyFilters();
  }

  async onSizeChange() {
    // Note: The API doesn't support size filtering, so we're just logging it
    console.log('Selected size:', this.selectedSize);
    await this.applyFilters();
  }

  async onColorChange() {
    // Note: The API doesn't support color filtering, so we're just logging it
    console.log('Selected color:', this.selectedColor);
    await this.applyFilters();
  }

  async onPriceRangeChange() {
    await this.applyFilters();
  }

  generateStars(rating: number): boolean[] {
    return Array(5).fill(false).map((_, index) => rating > index);
  }

  getRatingClass(rating: number): string {
    if (rating >= 4) {
      return 'rating-good';
    } else if (rating >= 3) {
      return 'rating-medium';
    } else {
      return 'rating-bad';
    }
  }

  toggleFavorite(event: Event, productId: number) {
    event.stopPropagation();
    // Implement favorite toggle logic here
    console.log('Toggle favorite for product:', productId);
  }

  addToCart(event: Event, productId: number) {
    event.stopPropagation();
    // Implement add to cart logic here
    console.log('Add to cart product:', productId);
  }
}
