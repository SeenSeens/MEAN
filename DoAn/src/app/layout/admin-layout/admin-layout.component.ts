import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: [
    // '../../../assets/admin/css/fontawesome.min.css',
    // '../../../assets/admin/css/bootstrap.min.css',
    // '../../../assets/admin/css/templatemo-style.css',
    './admin-layout.component.scss',
  ],
})
export class AdminLayoutComponent implements OnInit {
  isLoggedIn = false;
  userName = '';
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.userName = this.authService.getUserName() || 'User';
    }
  }
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userName = '';
    this.router.navigate(['admin/login']);
  }
}
