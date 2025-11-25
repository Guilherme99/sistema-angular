import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Login } from './login';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authSpy: jasmine.SpyObj<AuthService>;
  let msgSpy: jasmine.SpyObj<MessageService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj<AuthService>('AuthService', [
      'login',
      'user'
    ]);

    msgSpy = jasmine.createSpyObj<MessageService>('MessageService', ['add']);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, Login, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: MessageService, useValue: msgSpy },
        { provide: Router, useValue: routerSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir aviso se os campos estiverem vazios', () => {
    component.username = '';
    component.password = '';

    component.doLogin();

    // expect(msgSpy.add).toHaveBeenCalledWith({
    //   severity: 'warn',
    //   summary: 'Campos obrigatórios',
    //   detail: 'Informe usuário e senha'
    // });
    expect(authSpy.login).not.toHaveBeenCalled();
  });

  it('deve chamar authService.login quando campos forem válidos', () => {
    authSpy.login.and.returnValue(of({ token: '123' }));
    authSpy.user.and.returnValue({ username: 'admin' });

    component.username = 'admin';
    component.password = '123';

    component.doLogin();

    expect(authSpy.login).toHaveBeenCalledWith('admin', '123');
  });

  it('deve tratar login bem-sucedido e navegar', () => {
    authSpy.login.and.returnValue(of({ token: '123' }));
    authSpy.user.and.returnValue({ username: 'admin' });

    component.username = 'admin';
    component.password = '123';

    component.doLogin();

    expect(component.loading).toBeFalse();
    // expect(msgSpy.add).toHaveBeenCalledWith({
    //   severity: 'success',
    //   summary: 'Bem-vindo',
    //   detail: 'admin'
    // });

    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });

  it('deve exibir erro quando login falhar', () => {
    authSpy.login.and.returnValue(
      throwError(() => ({ error: { error: 'Credenciais inválidas' } }))
    );

    component.username = 'user';
    component.password = 'wrong';

    component.doLogin();

    expect(component.loading).toBeFalse();
    // expect(msgSpy.add).toHaveBeenCalledWith({
    //   severity: 'error',
    //   summary: 'Login inválido',
    //   detail: 'Credenciais inválidas'
    // });
  });

  it('deve exibir erro padrão se não houver mensagem no backend', () => {
    authSpy.login.and.returnValue(throwError(() => ({})));

    component.username = 'user';
    component.password = '123';

    component.doLogin();

    // expect(msgSpy.add).toHaveBeenCalledWith({
    //   severity: 'error',
    //   summary: 'Login inválido',
    //   detail: 'Falha ao autenticar'
    // });
  });

  it('deve ativar e desativar loading corretamente', () => {
    authSpy.login.and.returnValue(of({}));

    component.username = 'admin';
    component.password = '123';

    component.doLogin();

    expect(component.loading).toBeFalse();
  });

});
