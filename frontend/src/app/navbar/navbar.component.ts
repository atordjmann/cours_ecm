import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { User } from 'src/models';
import { AuthenticationService } from '../logging/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = new User;

  constructor(private globalService: GlobalService,
              private authenticationService: AuthenticationService,
              private router: Router
    ) {
     }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  openLoggingModal() {
    this.globalService.manageModale();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
