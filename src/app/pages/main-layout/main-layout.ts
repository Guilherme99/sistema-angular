import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Loader } from '../../components/loader/loader';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule, Loader],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css'] 
})
export class MainLayout {
  isSidebarOpen = true;
  loading = false;

  constructor(public authService: AuthService, private router: Router) {
  
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } 
      else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loading = false;
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  doLogout() {
    this.loading = true; 
    this.authService.logout();
  }

  
  navigateTo(route: string) {
    if (this.router.url === route) {
     
      this.loading = true;
      setTimeout(() => this.loading = false, 300);
    } else {
     
      this.loading = true;
      this.router.navigate([route]).finally(() => {
        
        this.loading = false;
      });
    }
  }
}
