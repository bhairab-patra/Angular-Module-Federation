import { Component } from '@angular/core';
import {
  TooltipComponent,
  ButtonComponent,
  CardComponent,
  IconComponent,
  BadgeComponent,
} from '@bhairab-patra/platform-ui';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';

@Component({
  selector: 'docs-tooltip-page',
  standalone: true,
  imports: [
    DocPageComponent,
    TooltipComponent,
    ButtonComponent,
    BadgeComponent,
    CardComponent,
    IconComponent,
    FrameworkPreviewComponent,
  ],
  templateUrl: './tooltip-page.component.html',
  styleUrls: ['./tooltip-page.component.scss'],
})
export class TooltipPageComponent {
  angularCode = `// toolbar-actions.component.ts
import { Component } from '@angular/core';
import { TooltipComponent, ButtonComponent, BadgeComponent } from '@bhairab-patra/platform-ui';

@Component({
  standalone: true,
  imports: [TooltipComponent, ButtonComponent, BadgeComponent],
  template: \`
    <!-- Toolbar: contextual help on every action button -->
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">

      <pui-lib-tooltip text="Save changes (Ctrl+S)" position="top" variant="dark">
        <pui-lib-button variant="primary" (click)="save()">Save</pui-lib-button>
      </pui-lib-tooltip>

      <pui-lib-tooltip text="Preview in a new tab" position="top" variant="dark">
        <pui-lib-button variant="secondary" (click)="preview()">Preview</pui-lib-button>
      </pui-lib-tooltip>

      <pui-lib-tooltip
        [text]="isAdmin ? 'Deploy to production' : 'Admin rights required'"
        position="top"
        [variant]="isAdmin ? 'teal' : 'dark'">
        <pui-lib-button variant="primary" [disabled]="!isAdmin">
          Publish
        </pui-lib-button>
      </pui-lib-tooltip>

      <pui-lib-tooltip text="Unsaved changes" position="right" variant="teal">
        <pui-lib-badge variant="warning">Draft</pui-lib-badge>
      </pui-lib-tooltip>

    </div>
  \`
})
export class ToolbarComponent {
  isAdmin = false;
  save()    { console.log('saved');    }
  preview() { console.log('preview'); }
}`;

  reactCode = `// UserTable.jsx — copy-to-clipboard & status tooltips in a data table
import { useState } from 'react';
// pui-elements.js loaded via <script> in index.html

const USERS = [
  { id: 1, name: 'Jane Doe',    email: 'jane@example.com', status: 'active'  },
  { id: 2, name: 'Bob Smith',   email: 'bob@example.com',  status: 'pending' },
  { id: 3, name: 'Alice Jones', email: 'alice@corp.com',   status: 'blocked' },
];

const STATUS_VARIANT = { active: 'success', pending: 'warning', blocked: 'danger' };
const STATUS_TIP     = { active: 'Account is active', pending: 'Awaiting approval', blocked: 'Access revoked' };

function CopyCell({ value }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {value}
      <pui-lib-tooltip
        text={copied ? '✓ Copied!' : 'Copy email'}
        position="top"
        variant={copied ? 'teal' : 'dark'}>
        <button onClick={copy} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
          📋
        </button>
      </pui-lib-tooltip>
    </span>
  );
}

export default function UserTable() {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr style={{ background: '#f1f5f9' }}>
          <th style={{ padding: '8px 12px', textAlign: 'left' }}>Name</th>
          <th style={{ padding: '8px 12px', textAlign: 'left' }}>Email</th>
          <th style={{ padding: '8px 12px', textAlign: 'left' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {USERS.map(u => (
          <tr key={u.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
            <td style={{ padding: '10px 12px' }}>{u.name}</td>
            <td style={{ padding: '10px 12px' }}><CopyCell value={u.email} /></td>
            <td style={{ padding: '10px 12px' }}>
              <pui-lib-tooltip text={STATUS_TIP[u.status]} position="left" variant="dark">
                <pui-lib-badge variant={STATUS_VARIANT[u.status]}>{u.status}</pui-lib-badge>
              </pui-lib-tooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}`;

  htmlCode = `<!-- Load the bundle once in your page -->
<script type="module" src="pui-elements.js"></script>

<!-- Basic: wrap any element -->
<pui-lib-tooltip text="Save changes" position="top">
  <button>Save</button>
</pui-lib-tooltip>

<!-- Positions -->
<pui-lib-tooltip text="Above"  position="top">    <span>Top</span></pui-lib-tooltip>
<pui-lib-tooltip text="Below"  position="bottom"> <span>Bottom</span></pui-lib-tooltip>
<pui-lib-tooltip text="Left"   position="left">   <span>Left</span></pui-lib-tooltip>
<pui-lib-tooltip text="Right"  position="right">  <span>Right</span></pui-lib-tooltip>

<!-- Variants -->
<pui-lib-tooltip text="Dark style"  variant="dark"  position="top"><button>Dark</button></pui-lib-tooltip>
<pui-lib-tooltip text="Light style" variant="light" position="top"><button>Light</button></pui-lib-tooltip>
<pui-lib-tooltip text="Teal style"  variant="teal"  position="top"><button>Teal</button></pui-lib-tooltip>`;

  code = `import { TooltipComponent } from '@bhairab-patra/platform-ui';

// ── Basic usage — wrap any element ────────────
<pui-lib-tooltip text="Save changes" position="top">
  <pui-lib-button variant="primary">Save</pui-lib-button>
</pui-lib-tooltip>

// ── Positions: top | bottom | left | right ───
<pui-lib-tooltip text="Appears above"  position="top">    <span>Hover me</span></pui-lib-tooltip>
<pui-lib-tooltip text="Appears below"  position="bottom"> <span>Hover me</span></pui-lib-tooltip>
<pui-lib-tooltip text="Appears left"   position="left">   <span>Hover me</span></pui-lib-tooltip>
<pui-lib-tooltip text="Appears right"  position="right">  <span>Hover me</span></pui-lib-tooltip>

// ── Variants: dark | light | teal ────────────
<pui-lib-tooltip text="Dark style"  variant="dark"  position="top"><pui-lib-button>Dark</pui-lib-button></pui-lib-tooltip>
<pui-lib-tooltip text="Light style" variant="light" position="top"><pui-lib-button>Light</pui-lib-button></pui-lib-tooltip>
<pui-lib-tooltip text="Teal style"  variant="teal"  position="top"><pui-lib-button>Teal</pui-lib-button></pui-lib-tooltip>

// ── On icons ──────────────────────────────────
<pui-lib-tooltip text="Download report" position="right">
  <pui-lib-icon name="download" size="md"></pui-lib-icon>
</pui-lib-tooltip>

// ── On badges ────────────────────────────────
<pui-lib-tooltip text="3 pending approvals" position="top">
  <pui-lib-badge variant="warning">Pending</pui-lib-badge>
</pui-lib-tooltip>

// ── On disabled buttons ───────────────────────
<pui-lib-tooltip text="You don't have permission" position="top">
  <pui-lib-button variant="primary" [disabled]="true">Delete</pui-lib-button>
</pui-lib-tooltip>`;

  api: ApiRow[] = [
    {
      input: 'text',
      type: 'string',
      default: `''`,
      description: 'Text shown in the tooltip bubble',
    },
    {
      input: 'position',
      type: `'top' | 'bottom' | 'left' | 'right'`,
      default: `'top'`,
      description: 'Placement relative to the trigger element',
    },
    {
      input: 'variant',
      type: `'dark' | 'light' | 'teal'`,
      default: `'dark'`,
      description: 'Visual style — dark bg, white card, or teal brand',
    },
  ];
}
