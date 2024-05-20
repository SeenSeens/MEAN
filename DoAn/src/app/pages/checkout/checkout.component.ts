import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  orderForm: FormGroup;
  cartItems: any[] = [];
  total: number = 0;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService
  ) {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      content: ['']
    });
  }

  ngOnInit() {
    this.loadCart();
  }
  loadCart() {
    this.cartService.getCartWithDetails().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }
  calculateTotal() {
    this.total = this.cartService.calculateTotal(this.cartItems);
  }
  onSubmit() {
    if (this.orderForm.valid) {
      const orderData = {
        ...this.orderForm.value,
        products: this.cartItems,
        status: 'pending' // Trạng thái ban đầu
      };
      this.orderService.placeOrder(orderData).subscribe(response => {
        console.log('Order placed successfully', response);
        // Xử lý logic sau khi đặt hàng thành công
      }, error => {
        console.error('Error placing order', error);
      });
    }
  }
}
