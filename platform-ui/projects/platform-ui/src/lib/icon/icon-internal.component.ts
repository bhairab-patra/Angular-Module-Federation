import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-icon-internal',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom,
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconInternalComponent extends IconComponent {}
