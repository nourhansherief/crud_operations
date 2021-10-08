import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: 'app-users-list-header',
  templateUrl: './users-list-header.component.html',
  styleUrls: ['./users-list-header.component.css']
})
export class UsersListHeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
