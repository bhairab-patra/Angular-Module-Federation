import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'docs-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router) {}
  goStart()      { this.router.navigate(['/getting-started']); }
  goComponents() { this.router.navigate(['/badge']); }
}
