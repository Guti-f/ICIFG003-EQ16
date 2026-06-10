import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.css'
})
export class MenuPage {

  private auth = inject(AuthService);
  private router = inject(Router);

  usuario = this.auth.usuario;

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
