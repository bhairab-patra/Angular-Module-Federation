import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PuiDatepickerComponent, DateRange } from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-datepicker-page',
  standalone: true,
  imports: [NgFor, NgIf, PuiDatepickerComponent, DocPageComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datepicker-page.component.html',
  styleUrls: ['./datepicker-page.component.scss'],
})
export class DatepickerPageComponent {
  cdr = inject(ChangeDetectorRef);

  fw = 'angular';
  copied = '';

  singleDate: Date | null = null;
  dateRange: DateRange = { start: null, end: null };
  prefilled: Date | null = new Date(2024, 10, 15);

  copy(id: string, text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.copied = id;
      this.cdr.markForCheck();
      setTimeout(() => {
        this.copied = '';
        this.cdr.markForCheck();
      }, 2000);
    });
  }

  trackByIndex(_i: number): number {
    return _i;
  }

  fmtDate(d: Date | null): string {
    if (!d) return '—';
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }

  daysBetween(a: Date, b: Date): number {
    return Math.round(Math.abs(b.getTime() - a.getTime()) / 86400000);
  }

  xfwRows = [
    {
      name: 'value',
      angular: '[value]="dateObj"',
      attr: '— use JS property',
      js: 'el.value = new Date(...)',
    },
    { name: 'mode', angular: 'mode="range"', attr: 'mode="range"', js: 'el.mode = "range"' },
    {
      name: 'min',
      angular: '[min]="minDate"',
      attr: 'min="2024-01-01"',
      js: 'el.min = new Date(...)',
    },
    {
      name: 'max',
      angular: '[max]="maxDate"',
      attr: 'max="2024-12-31"',
      js: 'el.max = new Date(...)',
    },
    {
      name: 'disabled',
      angular: '[disabled]="bool"',
      attr: 'disabled="true"',
      js: 'el.disabled = true',
    },
    {
      name: 'clearable',
      angular: '[clearable]="bool"',
      attr: 'clearable="true"',
      js: 'el.clearable = true',
    },
    {
      name: 'placeholder',
      angular: 'placeholder="Pick date…"',
      attr: 'placeholder="Pick…"',
      js: 'el.placeholder = "…"',
    },
    {
      name: 'valueChange',
      angular: '(valueChange)="fn($event)"',
      attr: '— use addEventListener',
      js: 'el.addEventListener("valueChange", fn)',
    },
    {
      name: 'rangeChange',
      angular: '(rangeChange)="fn($event)"',
      attr: '— use addEventListener',
      js: 'el.addEventListener("rangeChange", fn)',
    },
    {
      name: 'change',
      angular: '(change)="fn($event)"',
      attr: '— use addEventListener',
      js: 'el.addEventListener("change", fn)',
    },
  ];

  angularCode = `<!-- Single date -->
<pui-lib-datepicker
  [value]="selectedDate"
  [min]="minDate"
  [max]="maxDate"
  placeholder="Select date…"
  (valueChange)="selectedDate = $event">
</pui-lib-datepicker>

<!-- Range mode -->
<pui-lib-datepicker
  mode="range"
  placeholder="Start date → End date"
  (rangeChange)="onRangeChange($event)">
</pui-lib-datepicker>

// TypeScript
import { PuiDatepickerComponent, DateRange } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiDatepickerComponent] })
export class BookingComponent {
  selectedDate: Date | null = null;
  minDate = new Date();
  maxDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 90);
    return d;
  })();

  tripRange: DateRange = { start: null, end: null };

  onRangeChange(r: DateRange) {
    this.tripRange = r;
    if (r.start && r.end) {
      console.log('Trip:', r.start, '→', r.end);
    }
  }
}`;

  angHtml = `<!-- Single date -->
<pui-lib-datepicker
  [value]="selectedDate"
  [min]="minDate"
  [max]="maxDate"
  placeholder="Select date…"
  (valueChange)="selectedDate = $event">
</pui-lib-datepicker>

<!-- Range mode -->
<pui-lib-datepicker
  mode="range"
  placeholder="Start date → End date"
  (rangeChange)="onRangeChange($event)">
</pui-lib-datepicker>`;

  angTs = `import { PuiDatepickerComponent, DateRange } from '@bhairab-patra/platform-ui';

@Component({ imports: [PuiDatepickerComponent] })
export class BookingComponent {
  selectedDate: Date | null = null;
  minDate = new Date();
  maxDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 90);
    return d;
  })();

  tripRange: DateRange = { start: null, end: null };

  onRangeChange(r: DateRange) {
    this.tripRange = r;
    if (r.start && r.end) {
      console.log('Trip:', r.start, '→', r.end);
    }
  }
}`;

  reactCode = `import { useEffect, useRef, useState } from 'react';

export function BookingPicker() {
  const ref = useRef(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set constraints as Date objects
    el.min = new Date();
    const max = new Date();
    max.setDate(max.getDate() + 90);
    el.max = max;

    el.clearable = true;
    el.placeholder = 'Select check-in date…';

    const onPick = (e) => {
      setDate(e.detail);   // e.detail is a Date object
    };
    el.addEventListener('valueChange', onPick);
    return () => el.removeEventListener('valueChange', onPick);
  }, []);

  return (
    <>
      <pui-lib-datepicker ref={ref} />
      {date && <p>Check-in: {date.toLocaleDateString()}</p>}
    </>
  );
}`;

  htmlCode = `<script src="/assets/pui-elements.js"></script>

<pui-lib-datepicker
  id="myPicker"
  placeholder="Select a date…"
  clearable="true">
</pui-lib-datepicker>

<p id="output">No date selected</p>

<script>
  customElements.whenDefined('pui-lib-datepicker').then(() => {
    const el = document.getElementById('myPicker');
    const out = document.getElementById('output');

    // Set min/max as Date objects
    el.min = new Date();
    const max = new Date();
    max.setDate(max.getDate() + 30);
    el.max = max;

    el.addEventListener('valueChange', (e) => {
      const d = e.detail;  // Date object or null
      out.textContent = d
        ? 'Selected: ' + d.toLocaleDateString()
        : 'No date selected';
    });

    // Range mode example:
    // el.mode = 'range';
    // el.addEventListener('rangeChange', (e) => {
    //   const { start, end } = e.detail;
    //   console.log(start, end);
    // });
  });
</script>`;

  api: ApiRow[] = [
    {
      input: 'value',
      type: 'Date | null',
      default: 'null',
      description:
        'Selected date for single mode — pass a JS Date or ISO string. Supports formControlName / [(ngModel)] — the component implements ControlValueAccessor.',
    },
    {
      input: 'range',
      type: 'DateRange',
      default: 'start/end: null',
      description: 'Selected range for range mode — start: Date, end: Date',
    },
    {
      input: 'mode',
      type: '"single"|"range"',
      default: '"single"',
      description: 'Single date or date range selection mode',
    },
    {
      input: 'min',
      type: 'Date | null',
      default: 'null',
      description: 'Minimum selectable date — earlier dates are disabled and grayed',
    },
    {
      input: 'max',
      type: 'Date | null',
      default: 'null',
      description: 'Maximum selectable date — later dates are disabled and grayed',
    },
    {
      input: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the entire picker — trigger is dimmed and unclickable',
    },
    {
      input: 'clearable',
      type: 'boolean',
      default: 'true',
      description: 'Shows a × clear button and a Clear action in the calendar footer',
    },
    {
      input: 'placeholder',
      type: 'string',
      default: '"Select date…"',
      description: 'Placeholder text shown when no date is selected',
    },
    {
      input: 'valueChange',
      type: 'EventEmitter<Date|null>',
      default: '—',
      description: 'Emits the selected Date on pick, or null on clear (single mode)',
    },
    {
      input: 'rangeChange',
      type: 'EventEmitter<DateRange>',
      default: '—',
      description: 'Emits { start, end } when both dates are chosen (range mode)',
    },
    {
      input: 'change',
      type: 'EventEmitter<Date|DateRange|null>',
      default: '—',
      description: 'Unified event emitted on every selection or clear in any mode',
    },
    {
      input: 'formControlName / ngModel',
      type: '—',
      default: '—',
      description:
        'Implements ControlValueAccessor, so the component works directly with Reactive Forms and template-driven forms — writes/reads a Date in single mode and a DateRange in range mode.',
    },
  ];
}
