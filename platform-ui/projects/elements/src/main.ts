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
import { PuiTableComponent } from '../../platform-ui/src/lib/table/table.component';
import { PuiTabsComponent } from '../../platform-ui/src/lib/tabs/tabs.component';
import { PuiChipComponent } from '../../platform-ui/src/lib/chip/chip.component';
import { PuiTagComponent } from '../../platform-ui/src/lib/tag/tag.component';
import { PuiSkeletonComponent } from '../../platform-ui/src/lib/skeleton/skeleton.component';
import { PuiDataGridComponent } from '../../platform-ui/src/lib/datagrid/datagrid.component';
import { PuiListComponent } from '../../platform-ui/src/lib/list/list.component';
import { PuiDatepickerComponent } from '../../platform-ui/src/lib/datepicker/datepicker.component';
import { PuiPasswordInputComponent } from '../../platform-ui/src/lib/forms/password/password-input.component';
import { PuiComboboxComponent } from '../../platform-ui/src/lib/forms/combobox/combobox.component';
import { PuiMultiSelectComponent } from '../../platform-ui/src/lib/forms/multiselect/multiselect.component';
import { PuiSolifiSidebarComponent } from '../../platform-ui/src/lib/solifi-sidebar/solifi-sidebar.component';
import { PuiAvatarComponent } from '../../platform-ui/src/lib/avatar/avatar.component';

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
    const proto = NgElement.prototype as any;

    // Patch attributeChangedCallback so attribute changes from React / plain HTML
    // trigger Angular change detection.
    const origAttr = proto.attributeChangedCallback;
    proto.attributeChangedCallback = function (name: string, oldValue: string, newValue: string) {
      ngZone.run(() => {
        origAttr.call(this, name, oldValue, newValue);
        appRef.tick();
      });
    };

    customElements.define(tag, NgElement);
  };

  define(ButtonComponent, 'pui-lib-button');
  define(FileUploadButtonComponent, 'pui-lib-file-button');
  define(CardComponent, 'pui-lib-card');
  define(BadgeComponent, 'pui-lib-badge');
  define(ModalComponent, 'pui-lib-modal');
  // pui-lib-header and pui-lib-sidebar are NOT registered as standalone custom elements.
  // They are internal children of pui-lib-app-shell — Angular manages them via template
  // binding. Registering them would cause a duplicate component bootstrap (double header).
  define(IconComponent, 'pui-lib-icon');
  define(TooltipComponent, 'pui-lib-tooltip');
  define(SpinnerComponent, 'pui-lib-spinner');
  define(BreadcrumbComponent, 'pui-lib-breadcrumb');
  define(PuiInputComponent, 'pui-lib-input');
  define(PuiSelectComponent, 'pui-lib-select');
  define(PuiCheckboxComponent, 'pui-lib-checkbox');
  define(PuiRadioGroupComponent, 'pui-lib-radio-group');
  define(PuiTextareaComponent, 'pui-lib-textarea');
  define(PuiSwitchComponent, 'pui-lib-switch');
  define(PuiSearchComponent, 'pui-lib-search');
  define(PuiFilterPanelComponent, 'pui-lib-filter-panel');
  define(PuiToastContainerComponent, 'pui-lib-toast-container');
  define(PuiAppShellComponent, 'pui-lib-app-shell');
  define(PuiTableComponent, 'pui-lib-table');
  define(PuiTabsComponent, 'pui-lib-tabs');
  define(PuiChipComponent, 'pui-lib-chip');
  define(PuiTagComponent, 'pui-lib-tag');
  define(PuiSkeletonComponent, 'pui-lib-skeleton');
  define(PuiDataGridComponent, 'pui-lib-datagrid');
  define(PuiListComponent, 'pui-lib-list');
  define(PuiDatepickerComponent, 'pui-lib-datepicker');
  define(PuiPasswordInputComponent, 'pui-lib-password-input');
  define(PuiComboboxComponent, 'pui-lib-combobox');
  define(PuiMultiSelectComponent, 'pui-lib-multiselect');
  define(PuiSolifiSidebarComponent, 'pui-lib-solifi-sidebar');
  define(PuiAvatarComponent, 'pui-lib-avatar');

  // Expose tick helper — call after setting JS properties on custom elements from React
  // so Angular's change detection picks up the new values.
  (window as any)['puiTick'] = () => ngZone.run(() => appRef.tick());

  // Expose global toast API for React / plain HTML consumers
  const toast = app.injector.get(ToastService);
  (window as any)['puiToast'] = {
    success: (msg: string, cfg?: any) => ngZone.run(() => toast.success(msg, cfg)),
    error: (msg: string, cfg?: any) => ngZone.run(() => toast.error(msg, cfg)),
    warning: (msg: string, cfg?: any) => ngZone.run(() => toast.warning(msg, cfg)),
    info: (msg: string, cfg?: any) => ngZone.run(() => toast.info(msg, cfg)),
    dismiss: (id: string) => ngZone.run(() => toast.dismiss(id)),
    dismissAll: () => ngZone.run(() => toast.dismissAll()),
  };
})();
