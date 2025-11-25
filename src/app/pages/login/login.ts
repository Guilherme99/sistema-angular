import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ImageModule } from 'primeng/image';

import { Loader } from '../../components/loader/loader';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CardModule, InputTextModule, ButtonModule, ImageModule, ToastModule, PasswordModule, Loader, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  providers: [MessageService, provideAnimations()],
})
export class Login {
  username = '';
  password = '';
  loading = false;

  constructor(public authService: AuthService, private router: Router, private msg: MessageService) { }


  doLogin() {


    if (!this.username || !this.password) {
      this.msg.add({ severity: 'warn', summary: 'Campos obrigatórios', detail: 'Informe usuário e senha' })
      return;
    }
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        
          this.loading = false;
          this.msg.add({ severity: 'success', summary: 'Bem-vindo', detail: this.authService.user()?.username ?? 'Usuário' });
          this.router.navigate(['']);
        }, 
 
      error: (err) => {
        this.loading = false;
        const detail = err?.error?.error || 'Falha ao autenticar';
        this.msg.add({ severity: 'error', summary: 'Login inválido', detail });
      }
    });
  }

}
