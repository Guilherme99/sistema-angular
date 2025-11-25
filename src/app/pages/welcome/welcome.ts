import { Component, AfterViewInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.css']
})
export class Welcome implements AfterViewInit {

  currentYear: number = new Date().getFullYear();


  ngAfterViewInit() {
    const blue = document.getElementById('blueOverlay')!;
    const text = document.getElementById('welcomeText')!;
    const bone = document.getElementById('bonequinho')!;

    const animate = () => {
      
      blue.style.height = '0';
      text.style.opacity = '0';
      bone.style.opacity = '0';

      // Anima camada azul
      setTimeout(() => blue.classList.add('show-blue'), 200);

      // Anima texto
      setTimeout(() => text.classList.add('show-text'), 1500);

      // Anima bonequinho
      setTimeout(() => bone.classList.add('show-bone'), 2500);

     
      setTimeout(() => {
        blue.classList.remove('show-blue');
        text.classList.remove('show-text');
        bone.classList.remove('show-bone');
      }, 5000); 
    };

    animate(); 
    setInterval(animate, 5200); 
  }
}
