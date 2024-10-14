import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faLocationDot,
  faBars,
  faShoppingCart,
  faChevronDown,
  faX,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FontAwesomeModule],
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
}
