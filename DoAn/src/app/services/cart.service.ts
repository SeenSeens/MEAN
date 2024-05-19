import { Injectable } from '@angular/core';
import {catchError, combineLatest, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CONSTANT} from "../constant/constant";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart';
  apiEndPoint: string ='';
  // private productUrl = 'http://localhost:3000/api/product';
  constructor(private http: HttpClient) {
    this.apiEndPoint = environment.apiEndPoint;
  }

  // Nhận giỏ hàng từ localStorage
  getCart() {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }
  // Lưu giỏ hàng vào localStorage
  saveCart(cart: any) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
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
  }
  // Xóa giỏ hàng
  clearCart() {
    localStorage.removeItem(this.cartKey);
  }
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
  calculateSubtotal(item: any): number {
    return item.price * item.quantity;
  }
  calculateTotal(cartItems: any[]): number {
    return cartItems.reduce((total, item) => total + this.calculateSubtotal(item), 0);
  }

}
