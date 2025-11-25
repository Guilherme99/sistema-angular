import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api-service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('sistema-pericias-angular');

  constructor(private api: ApiService) { }


}
