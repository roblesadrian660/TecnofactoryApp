import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ){}

  onLogin() {
    if (!this.email || !this.password) {
      this.showMessage('Por favor, ingresa tu usuario y contraseña.', 'error');
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.error.message) {
          this.showMessage(err.error.message, 'error');
          return;
        }
        this.showMessage('Usuario o contraseña incorrectos.', 'error')
      }
    });
  }

  private showMessage(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
