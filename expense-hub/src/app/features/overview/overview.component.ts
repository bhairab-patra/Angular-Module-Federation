import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

// ↓ imported from the published npm package "platform-ui"
import { ButtonComponent, CardComponent, CardData } from 'platform-ui';

@Component({
  selector: 'exp-overview',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  onAddExpense(): void { alert('Add expense — wire to your API here.'); }
}
