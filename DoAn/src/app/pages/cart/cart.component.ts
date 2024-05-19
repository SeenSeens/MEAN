import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  constructor( private cartService: CartService ) {}
  ngOnInit() {
    this.loadCart();
  }
  loadCart() {
    // this.cartItems = this.cartService.getCart();
    this.cartService.getCartWithDetails().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }
  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }

  calculateTotal() {
    this.total = this.cartService.calculateTotal(this.cartItems);
  }

  calculateSubtotal(item: any): number {
    return this.cartService.calculateSubtotal(item);
  }
}
