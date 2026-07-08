import { NgModule } from '@angular/core';
import { ButtonComponent }  from './button/button.component';
import { CardComponent }    from './card/card.component';
import { BadgeComponent }   from './badge/badge.component';
import { ModalComponent }   from './modal/modal.component';
import { HeaderComponent }  from './header/header.component';

@NgModule({
  imports: [ButtonComponent, CardComponent, BadgeComponent, ModalComponent, HeaderComponent],
  exports: [ButtonComponent, CardComponent, BadgeComponent, ModalComponent, HeaderComponent],
})
export class PlatformUiModule {}
