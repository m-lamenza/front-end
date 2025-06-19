import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../Auth/infrastructure/services/auth.service';
import { SidebarComponent } from './components/sidebar.component';
import { HeaderComponent } from './components/header.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getSSOToken();
  }

  showToken() {
    this.authService.getSSOToken();
  }
} 