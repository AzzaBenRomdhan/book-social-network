import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {TokenService} from "../../services/token/token.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  userFullName = '';
  constructor(private router: Router, private tokenService: TokenService) {}
  private jwtHelper = new JwtHelperService();

  ngOnInit() {
    this.loadUserFullName();
  }
  logout(){
    localStorage.clear();
    window.location.reload();
  }
  loadUserFullName() {
    const token = this.tokenService.token;
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.userFullName = 'Guest';
    }

    const decodedToken = this.jwtHelper.decodeToken(token);
    return this.userFullName = decodedToken?.fullname || 'Unkowen user';
  }
}
