import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FakeStoreService } from '../fake-store.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faShoppingCart, faStar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productDetails: any = {};
  currentImageIndex: number = 0;
  isLoading: boolean = true;
  isInWishlist: boolean = false;
  addingToCart: boolean = false;
  addedToCart: boolean = false;

  // FontAwesome icons
  faHeart = faHeart;
  faShoppingCart = faShoppingCart;
  faStar = faStar;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  constructor(
    private route: ActivatedRoute,
    private fakeStoreService: FakeStoreService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchProductDetails(parseInt(id));
    }
  }

  async fetchProductDetails(id: number) {
    this.isLoading = true;
    try {
      this.productDetails = await this.fakeStoreService.getProductById(id);
      // Simulate multiple images
      this.productDetails.images = [this.productDetails.image, this.productDetails.image, this.productDetails.image];
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      this.isLoading = false;
    }
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.productDetails.images.length;
  }

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.productDetails.images.length) % this.productDetails.images.length;
  }

  async addToCart(id: number) {
    this.addingToCart = true;
    try {
      // Simulate adding to cart
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.addedToCart = true;
      setTimeout(() => this.addedToCart = false, 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      this.addingToCart = false;
    }
  }

  toggleWishlist() {
    this.isInWishlist = !this.isInWishlist;
    // Implement actual wishlist logic here
  }

  generateStars(rating: number): boolean[] {
    return Array(5).fill(false).map((_, index) => rating > index);
  }
}
