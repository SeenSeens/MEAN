import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  totalQuantity: number = 0; // Tổng số lượng sản phẩm
  isEmptyCart: boolean = false;

  apiEndPoint = '';

  constructor( private cartService: CartService ) {
    this.apiEndPoint = environment.urlEndPoint;
  }
  ngOnInit() {
    // this.loadCart();
    this.cartService.getCartSubject().subscribe(cart => {
      this.isEmptyCart = cart.length === 0;
      this.loadCart();
    });
  }
  loadCart() {
    this.cartService.getCartWithDetails().subscribe(items => {
      this.cartItems = items.map(item => {
        item.thumbnailUrl = `${this.apiEndPoint}${item.thumbnail}`;
        return item;
      });
      this.isEmptyCart = this.cartService.isCartEmpty();
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
    this.totalQuantity = this.cartService.calculateTotalQuantity(this.cartItems); // Tính tổng số lượng
  }

  calculateSubtotal(item: any): number {
    return this.cartService.calculateSubtotal(item);
  }

  updateQuantity(event: any, item: any) {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      item.quantity = newQuantity;
      this.cartService.saveCart(this.cartItems); // Lưu giỏ hàng mới
      this.cartService.updateCart(this.cartItems); // Thông báo rằng giỏ hàng đã thay đổi
      this.calculateTotal();
      // Kiểm tra nếu số lượng sản phẩm bằng 0, hiển thị cảnh báo
      if (newQuantity === 0) {
        const confirmed = confirm('Bạn có muốn xóa sản phẩm này?');
        if (confirmed) {
          this.removeFromCart(item._id);
        } else {
          // Nếu người dùng không xóa sản phẩm, reset số lượng sản phẩm về 1
          item.quantity = 1;
          this.cartService.saveCart(this.cartItems); // Lưu giỏ hàng mới
          this.cartService.updateCart(this.cartItems); // Thông báo rằng giỏ hàng đã thay đổi
          this.calculateTotal();
        }
      }
    }
  }

}
