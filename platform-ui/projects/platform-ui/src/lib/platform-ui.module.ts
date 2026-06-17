import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';

/**
 * Convenience NgModule — import PlatformUiModule in any NgModule-based app.
 * Standalone apps can also import ButtonComponent / CardComponent directly.
 */
@NgModule({
  imports: [ButtonComponent, CardComponent],
  exports: [ButtonComponent, CardComponent],
})
export class PlatformUiModule {}
