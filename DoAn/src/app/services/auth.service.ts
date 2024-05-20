import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable} from "rxjs";
import { User, Credentials } from "../models/user.model"
import {environment} from "../../environments/environment";
import {CONSTANT} from "../constant/constant";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiEndPoint: string ='';
  private authUrl = 'http://localhost:3000/api/user';
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    // this.apiEndPoint = environment.apiEndPoint;
  }

  register(user: User): Observable<any> {
    // return this.http.post(`${ this.apiEndPoint + CONSTANT.ENDPOINTS.USER.REGISTER }`, user);
    return this.http.post(`${this.authUrl}/register`, user);
  }
  login(credentials: Credentials): Observable<any> {
    // return this.http.post(`${ this.apiEndPoint + CONSTANT.ENDPOINTS.USER.LOGIN }`, credentials);
    return this.http.post(`${this.authUrl}/login`, credentials);
  }
  isAuthenticated() {
    if (typeof localStorage !== 'undefined') {
      // Kiểm tra xem localStorage có tồn tại không trước khi sử dụng
      const token = localStorage.getItem('token');
      // Tiếp tục xử lý
      return token ? true : false;
      // return token ? !this.jwtHelper.isTokenExpired(token) : false;
    } else {
      // Xử lý nếu localStorage không tồn tại
      return false;
    }
  }
  getUserName(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.username || null; // Assuming the token contains a 'username' field
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
