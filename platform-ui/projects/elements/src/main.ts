import { ApplicationRef, NgZone } from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import { ToastService } from '../../platform-ui/src/lib/toast/toast.service';
import { createCustomElement } from '@angular/elements';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ButtonComponent } from '../../platform-ui/src/lib/button/button.component';
import { FileUploadButtonComponent } from '../../platform-ui/src/lib/button/file-upload-button.component';
import { CardComponent } from '../../platform-ui/src/lib/card/card.component';
import { BadgeComponent } from '../../platform-ui/src/lib/badge/badge.component';
import { ModalComponent } from '../../platform-ui/src/lib/modal/modal.component';
import { HeaderComponent } from '../../platform-ui/src/lib/header/header.component';
import { IconComponent } from '../../platform-ui/src/lib/icon/icon.component';
import { TooltipComponent } from '../../platform-ui/src/lib/tooltip/tooltip.component';
import { SpinnerComponent } from '../../platform-ui/src/lib/spinner/spinner.component';
import { BreadcrumbComponent } from '../../platform-ui/src/lib/breadcrumb/breadcrumb.component';
import { PuiInputComponent } from '../../platform-ui/src/lib/forms/input/input.component';
import { PuiSelectComponent } from '../../platform-ui/src/lib/forms/select/select.component';
import { PuiCheckboxComponent } from '../../platform-ui/src/lib/forms/checkbox/checkbox.component';
import { PuiRadioGroupComponent } from '../../platform-ui/src/lib/forms/radio/radio.component';
import { PuiTextareaComponent } from '../../platform-ui/src/lib/forms/textarea/textarea.component';
import { PuiSwitchComponent } from '../../platform-ui/src/lib/forms/switch/switch.component';
import { PuiSearchComponent } from '../../platform-ui/src/lib/search/search.component';
import { PuiFilterPanelComponent } from '../../platform-ui/src/lib/filter-panel/filter-panel.component';
import { PuiToastContainerComponent } from '../../platform-ui/src/lib/toast/toast-container.component';
import { PuiSidebarComponent } from '../../platform-ui/src/lib/sidebar/sidebar.component';
import { PuiAppShellComponent } from '../../platform-ui/src/lib/app-shell/app-shell.component';

(async () => {
  const app = await createApplication({
    providers: [
      provideAnimations(),
      importProvidersFrom(ReactiveFormsModule, FormsModule),
    ],
  });

  const ngZone = app.injector.get(NgZone);
  const appRef = app.injector.get(ApplicationRef);

  const define = (component: any, tag: string) => {
    if (customElements.get(tag)) return;

    const NgElement = createCustomElement(component, { injector: app.injector });

    // Patch attributeChangedCallback on the prototype so HTML attribute changes
    // from any framework (React, plain HTML, Vue) trigger Angular change detection.
    // Without this, OnPush components silently ignore externally-set attributes.
    const proto = NgElement.prototype as any;
    const original = proto.attributeChangedCallback;
    proto.attributeChangedCallback = function(name: string, oldValue: string, newValue: string) {
      ngZone.run(() => {
        original.call(this, name, oldValue, newValue);
        appRef.tick();
      });
    };

    customElements.define(tag, NgElement);
  };

  define(ButtonComponent,           'pui-lib-button');
  define(FileUploadButtonComponent, 'pui-lib-file-upload');
  define(CardComponent,             'pui-lib-card');
  define(BadgeComponent,            'pui-lib-badge');
  define(ModalComponent,            'pui-lib-modal');
  define(HeaderComponent,           'pui-lib-header');
  define(IconComponent,             'pui-lib-icon');
  define(TooltipComponent,          'pui-lib-tooltip');
  define(SpinnerComponent,          'pui-lib-spinner');
  define(BreadcrumbComponent,       'pui-lib-breadcrumb');
  define(PuiInputComponent,         'pui-lib-input');
  define(PuiSelectComponent,        'pui-lib-select');
  define(PuiCheckboxComponent,      'pui-lib-checkbox');
  define(PuiRadioGroupComponent,    'pui-lib-radio');
  define(PuiTextareaComponent,      'pui-lib-textarea');
  define(PuiSwitchComponent,        'pui-lib-switch');
  define(PuiSearchComponent,        'pui-lib-search');
  define(PuiFilterPanelComponent,   'pui-lib-filter-panel');
  define(PuiToastContainerComponent,'pui-lib-toast-container');
  define(PuiSidebarComponent,       'pui-lib-sidebar');
  define(PuiAppShellComponent,      'pui-lib-app-shell');

  // Expose global toast API for React / plain HTML consumers
  const toast = app.injector.get(ToastService);
  (window as any)['puiToast'] = {
    success: (msg: string, cfg?: any) => ngZone.run(() => toast.success(msg, cfg)),
    error:   (msg: string, cfg?: any) => ngZone.run(() => toast.error(msg, cfg)),
    warning: (msg: string, cfg?: any) => ngZone.run(() => toast.warning(msg, cfg)),
    info:    (msg: string, cfg?: any) => ngZone.run(() => toast.info(msg, cfg)),
    dismiss: (id: string)             => ngZone.run(() => toast.dismiss(id)),
    dismissAll: ()                    => ngZone.run(() => toast.dismissAll()),
  };
})();
