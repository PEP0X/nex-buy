import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faHeart } from '@fortawesome/free-regular-svg-icons';
import { RouterModule } from '@angular/router';
import {
  faLocationDot,
  faBars,
  faShoppingCart,
  faChevronDown,
  faX,
  faMagnifyingGlass,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { FakeStoreService } from '../fake-store.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  location = faLocationDot;
  user = faUser;
  heart = faHeart;
  bars = faBars;
  cart = faShoppingCart;
  down = faChevronDown;
  x = faX;
  magnifying = faMagnifyingGlass;
  signOut = faSignOutAlt;

  constructor(public fakeStoreService: FakeStoreService, private router: Router) {}

  logout() {
    this.fakeStoreService.logout();
    this.router.navigate(['/login']);
  }
}
