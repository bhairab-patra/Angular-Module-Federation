import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';
import { PuiPopoverComponent, PopoverPlacement } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'docs-popover-page',
  standalone: true,
  imports: [NgFor, DocPageComponent, PuiPopoverComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './popover-page.component.html',
  styleUrls: ['./popover-page.component.scss'],
})
export class PopoverPageComponent {
  private cdr = inject(ChangeDetectorRef);

  clickOpen = false;
  hoverOpen = false;
  manualOpen = false;
  fwOpen = false;

  placements: { id: PopoverPlacement; label: string }[] = [
    { id: 'top', label: 'Top' },
    { id: 'top-start', label: 'Top Start' },
    { id: 'top-end', label: 'Top End' },
    { id: 'bottom', label: 'Bottom' },
    { id: 'bottom-start', label: 'Bottom Start' },
    { id: 'bottom-end', label: 'Bottom End' },
    { id: 'left', label: 'Left' },
    { id: 'right', label: 'Right' },
  ];
  placementOpen: Record<string, boolean> = {};

  onPlacementOpenChange(id: string, open: boolean): void {
    this.placementOpen[id] = open;
    this.cdr.markForCheck();
  }

  onClickOpenChange(v: boolean): void {
    this.clickOpen = v;
    this.cdr.markForCheck();
  }
  onHoverOpenChange(v: boolean): void {
    this.hoverOpen = v;
    this.cdr.markForCheck();
  }
  onFwOpenChange(v: boolean): void {
    this.fwOpen = v;
    this.cdr.markForCheck();
  }

  toggleManual(): void {
    this.manualOpen = !this.manualOpen;
    this.cdr.markForCheck();
  }

  trackByIndex(_i: number): number {
    return _i;
  }

  angularCode = `import { PuiPopoverComponent } from '@bhairab-patra/platform-ui';

@Component({
  standalone: true,
  imports: [PuiPopoverComponent],
  template: \`
    <pui-lib-popover placement="bottom" [(open)]="open">
      <button popoverTrigger>Open popover</button>
      <div>
        <strong>Quick actions</strong>
        <p>Any content can go here — forms, lists, rich text.</p>
      </div>
    </pui-lib-popover>
  \`
})
export class MyComponent {
  open = false;
}`;

  reactCode = `import { useRef, useEffect } from 'react';
import '@bhairab-patra/platform-ui';

export function MyPopover() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onOpenChange = (e) => console.log('open:', e.detail);
    el.addEventListener('openChange', onOpenChange);
    return () => el.removeEventListener('openChange', onOpenChange);
  }, []);

  return (
    <pui-lib-popover ref={ref} placement="bottom">
      <button slot="popoverTrigger">Open popover</button>
      <div>
        <strong>Quick actions</strong>
        <p>Any content can go here.</p>
      </div>
    </pui-lib-popover>
  );
}`;

  htmlCode = `<!-- Load the bundle once in your page -->
<script type="module" src="pui-elements.js"></script>

<pui-lib-popover placement="bottom">
  <button popoverTrigger>Open popover</button>
  <div>
    <strong>Quick actions</strong>
    <p>Any content can go here.</p>
  </div>
</pui-lib-popover>`;

  xfwRows = [
    {
      name: 'placement',
      angular: 'placement="bottom-start"',
      attr: 'placement="bottom-start"',
      js: 'el.placement = "bottom-start"',
    },
    {
      name: 'triggerMode',
      angular: 'triggerMode="hover"',
      attr: 'trigger-mode="hover"',
      js: 'el.triggerMode = "hover"',
    },
    { name: 'open', angular: '[(open)]="open"', attr: '—', js: 'el.open = true' },
    {
      name: 'showArrow',
      angular: '[showArrow]="false"',
      attr: 'show-arrow="false"',
      js: 'el.showArrow = false',
    },
    { name: 'disabled', angular: '[disabled]="true"', attr: 'disabled', js: 'el.disabled = true' },
    {
      name: 'openChange',
      angular: '(openChange)="fn($event)"',
      attr: '—',
      js: `el.addEventListener('openChange', fn)`,
    },
  ];

  api: ApiRow[] = [
    {
      input: 'placement',
      type: `'top'|'top-start'|'top-end'|'bottom'|'bottom-start'|'bottom-end'|'left'|'right'`,
      default: `'bottom'`,
      description: 'Where the panel appears relative to the trigger.',
    },
    {
      input: 'triggerMode',
      type: `'click'|'hover'|'manual'`,
      default: `'click'`,
      description:
        "click = toggle on trigger click, outside click closes it. hover = opens/closes on mouse enter/leave (with a small grace delay so moving from trigger to panel doesn't flicker-close it). manual = fully controlled — drive it via [open] only, no built-in open/close triggers.",
    },
    {
      input: 'open',
      type: 'boolean | string',
      default: 'false',
      description:
        'Open state. Two-way bindable with [(open)]. Required when triggerMode="manual".',
    },
    {
      input: 'showArrow',
      type: 'boolean | string',
      default: 'true',
      description: 'Show the small pointer arrow connecting the panel to the trigger.',
    },
    {
      input: 'disabled',
      type: 'boolean | string',
      default: 'false',
      description:
        'Disables opening entirely (click/hover triggers are ignored; manual open is also blocked).',
    },
    {
      input: 'openChange',
      type: 'EventEmitter<boolean> (output)',
      default: '—',
      description:
        'Fires whenever the open state changes, for any reason (trigger click, hover, outside click, Escape).',
    },
    {
      input: 'popoverTrigger (slot)',
      type: 'ng-content',
      default: '—',
      description:
        'Project the trigger element with the popoverTrigger attribute, e.g. <button popoverTrigger>.',
    },
    {
      input: 'content (default slot)',
      type: 'ng-content',
      default: '—',
      description:
        'Anything projected without a slot attribute becomes the panel body — any content works, not just text/menus.',
    },
  ];
}
