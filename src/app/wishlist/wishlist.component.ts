import { Component, OnInit } from '@angular/core';
import { FakeStoreService } from '../fake-store.service';
import { Product } from '../product.model';
import { WishlistItem } from '../wishlist-item.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];

  constructor(private fakeStoreService: FakeStoreService) { }

  ngOnInit(): void {
    this.loadWishlist();
  }

  async loadWishlist(): Promise<void> {
    const wishlistIds = this.fakeStoreService.getWishlistItems();
    this.wishlistItems = await Promise.all(
      wishlistIds.map(async (item): Promise<WishlistItem> => {
        const product = await this.fakeStoreService.getProductById(item.productId);
        return {
          id: item.productId,
          product: product,
          addedAt: item.addedAt
        };
      })
    );
  }

  async removeFromWishlist(productId: number): Promise<void> {
    try {
      await this.fakeStoreService.removeFromWishlist(productId);
      await this.loadWishlist();
      this.showToast('success', 'Removed from Wishlist', 'Item removed successfully!');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      this.showToast('error', 'Error', 'Failed to remove item from wishlist. Please try again.');
    }
  }

  async addToCart(product: Product): Promise<void> {
    try {
      await this.fakeStoreService.addToCart(product.id);
      await this.removeFromWishlist(product.id);
      this.showToast('success', 'Added to Cart', 'Item added to cart and removed from wishlist!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      this.showToast('error', 'Error', 'Failed to add item to cart. Please try again.');
    }
  }

  private showToast(icon: 'success' | 'error', title: string, text: string): void {
    Swal.fire({
      icon,
      title,
      text,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }
}
