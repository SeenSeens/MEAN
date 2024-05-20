import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, combineLatest, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CONSTANT} from "../constant/constant";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart';
  apiEndPoint: string ='';
  private cartSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    this.apiEndPoint = environment.apiEndPoint;
    this.loadCart();
  }

  loadCart() {
    const cart = this.getCart();
    this.updateCart(cart);
  }
  updateCart(cart: any[]) {
    this.cartSubject.next(cart);
  }
  // Kiểm tra sự tồn tại của localStorage
  isLocalStorageAvailable(): boolean {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
  // Nhận giỏ hàng từ localStorage
  getCart() {
    if (this.isLocalStorageAvailable()) {
      const cart = localStorage.getItem(this.cartKey);
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  }
  // Lưu giỏ hàng vào localStorage
  saveCart(cart: any) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.updateCart(cart);
  }
  // Add item to cart
  addToCart(productId: string, quantity: number = 1) {
    let cart = this.getCart();
    let itemIndex = cart.findIndex((item: any) => item.productId === productId);
    if (itemIndex > -1) {
      // Product exists in cart, update quantity
      cart[itemIndex].quantity += quantity;
    } else {
      // Product does not exist in cart, add new item
      cart.push({ productId, quantity });
    }
    this.saveCart(cart);
  }
  // Xóa mặt hàng khỏi giỏ hàng
  removeFromCart(productId: string) {
    let cart = this.getCart();
    cart = cart.filter((item: any) => item.productId !== productId);
    this.saveCart(cart);
    this.cartSubject.next(cart); // Thông báo rằng giỏ hàng đã thay đổi
  }
  // Xóa giỏ hàng
  clearCart() {
    localStorage.removeItem(this.cartKey);
    this.updateCart([]);
  }
  // Lấy chi tiết thông tin sản phẩm
  getProduct(productId: string): Observable<any> {
    return this.http.get(`${ this.apiEndPoint + CONSTANT.ENDPOINTS.PRODUCT }/${ productId }`);
  }

  getCartWithDetails(): Observable<any[]> {
    const cart = this.getCart();
    const productObservables = cart.map((item: any) =>
      this.getProduct(item.productId).pipe(
        map(product => ({ ...product, quantity: item.quantity }))
      )
    );
    // @ts-ignore
    return combineLatest(productObservables);
  }
  // Tính tiền từng sản phẩm
  calculateSubtotal(item: any): number {
    return item.price * item.quantity;
  }
  // Tính tổng tiền
  calculateTotal(cartItems: any[]): number {
    return cartItems.reduce((total, item) => total + this.calculateSubtotal(item), 0);
  }
  // Tính tổng số lượng sản phẩm trong giỏ hàng
  calculateTotalQuantity(cartItems: any[]): number {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }
  // Thêm phương thức mới để kiểm tra xem giỏ hàng có rỗng không
  isCartEmpty(): boolean {
    const cart = this.cartSubject.getValue();
    return cart.length === 0;
  }
  getCartSubject(): BehaviorSubject<any[]> {
    return this.cartSubject;
  }
}
