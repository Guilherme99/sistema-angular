import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayout } from './main-layout';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('MainLayout', () => {
  let component: MainLayout;
  let fixture: ComponentFixture<MainLayout>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout', 'user']);
    authServiceSpy.user.and.returnValue({ username: 'admin', roles: ['admin'] });

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MainLayout],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.logout when doLogout is called', () => {
    component.doLogout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });
});
