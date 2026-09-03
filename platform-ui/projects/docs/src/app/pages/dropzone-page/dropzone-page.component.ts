import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DocPageComponent, ApiRow } from '../../shared/doc-page.component';
import { FrameworkPreviewComponent } from '../../shared/framework-preview.component';
import { PuiDropzoneComponent, DropzoneFile, DropzoneRejection } from '@bhairab-patra/platform-ui';

@Component({
  selector: 'docs-dropzone-page',
  standalone: true,
  imports: [NgFor, NgIf, DocPageComponent, PuiDropzoneComponent, FrameworkPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropzone-page.component.html',
  styleUrls: ['./dropzone-page.component.scss'],
})
export class DropzonePageComponent {
  private cdr = inject(ChangeDetectorRef);

  basicFiles: DropzoneFile[] = [];
  lastRejection = '';

  imageFiles: DropzoneFile[] = [];

  progressFiles: DropzoneFile[] = [
    {
      id: 'p1',
      file: new File([], 'annual-statement.pdf'),
      name: 'annual-statement.pdf',
      size: 2_400_000,
      status: 'done',
    },
    {
      id: 'p2',
      file: new File([], 'borrower-agreement.docx'),
      name: 'borrower-agreement.docx',
      size: 850_000,
      status: 'uploading',
      progress: 62,
    },
    {
      id: 'p3',
      file: new File([], 'scan-corrupted.png'),
      name: 'scan-corrupted.png',
      size: 120_000,
      status: 'error',
      errorMessage: 'Upload failed — file too large for server',
    },
  ];

  fwFiles: DropzoneFile[] = [];

  onBasicFilesChange(files: DropzoneFile[]): void {
    this.basicFiles = files;
    this.cdr.markForCheck();
  }
  onImageFilesChange(files: DropzoneFile[]): void {
    this.imageFiles = files;
    this.cdr.markForCheck();
  }
  onFwFilesChange(files: DropzoneFile[]): void {
    this.fwFiles = files;
    this.cdr.markForCheck();
  }

  onProgressFileRemove(f: DropzoneFile): void {
    this.progressFiles = this.progressFiles.filter((x) => x.id !== f.id);
    this.cdr.markForCheck();
  }

  onRejected(rejections: DropzoneRejection[]): void {
    const r = rejections[0];
    this.lastRejection =
      r.reason === 'size'
        ? `${r.file.name} was rejected — over the size limit`
        : `${r.file.name} was rejected — unsupported file type`;
    this.cdr.markForCheck();
  }

  trackByIndex(_i: number): number {
    return _i;
  }

  angularCode = `import { PuiDropzoneComponent, DropzoneFile } from '@bhairab-patra/platform-ui';

@Component({
  standalone: true,
  imports: [PuiDropzoneComponent],
  template: \`
    <pui-lib-dropzone
      label="Drag & drop files here"
      accept=".pdf,.docx,.png,.jpg"
      [maxSizeMB]="10"
      [files]="files"
      (filesChange)="files = $event"
      (filesAdded)="onFilesAdded($event)"
      (rejected)="onRejected($event)">
    </pui-lib-dropzone>
  \`
})
export class MyComponent {
  files: DropzoneFile[] = [];

  onFilesAdded(added: DropzoneFile[]) {
    // Upload each file yourself, then update its status/progress:
    // added.forEach(f => uploadService.upload(f.file, pct => {
    //   f.progress = pct; f.status = 'uploading';
    // }));
  }

  onRejected(rejections) {
    console.log('Rejected:', rejections);
  }
}`;

  reactCode = `import { useRef, useEffect, useState } from 'react';
import '@bhairab-patra/platform-ui';

export function Uploader() {
  const ref = useRef(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onChange = (e) => setFiles(e.detail);
    const onRejected = (e) => console.log('Rejected:', e.detail);
    el.addEventListener('filesChange', onChange);
    el.addEventListener('rejected', onRejected);
    return () => {
      el.removeEventListener('filesChange', onChange);
      el.removeEventListener('rejected', onRejected);
    };
  }, []);

  useEffect(() => {
    if (ref.current) { ref.current.files = files; window.puiTick?.(); }
  }, [files]);

  return (
    <pui-lib-dropzone
      ref={ref}
      label="Drag & drop files here"
      accept=".pdf,.docx,.png,.jpg"
      max-size-m-b={10} />
  );
}`;

  htmlCode = `<!-- Load the bundle once in your page -->
<script type="module" src="pui-elements.js"></script>

<pui-lib-dropzone
  id="dz"
  label="Drag & drop files here"
  accept=".pdf,.docx,.png,.jpg">
</pui-lib-dropzone>

<script>
  customElements.whenDefined('pui-lib-dropzone').then(() => {
    const el = document.getElementById('dz');
    el.maxSizeMB = 10;
    el.addEventListener('filesChange', (e) => {
      el.files = e.detail;
      console.log('Files:', e.detail);
    });
    el.addEventListener('rejected', (e) => console.log('Rejected:', e.detail));
  });
</script>`;

  xfwRows = [
    { name: 'label', angular: 'label="..."', attr: 'label="..."', js: 'el.label = "..."' },
    { name: 'hint', angular: 'hint="..."', attr: 'hint="..."', js: 'el.hint = "..."' },
    {
      name: 'accept',
      angular: 'accept=".pdf,.png"',
      attr: 'accept=".pdf,.png"',
      js: 'el.accept = ".pdf,.png"',
    },
    {
      name: 'multiple',
      angular: '[multiple]="false"',
      attr: 'multiple="false"',
      js: 'el.multiple = false',
    },
    {
      name: 'maxSizeMB',
      angular: '[maxSizeMB]="10"',
      attr: 'max-size-m-b="10"',
      js: 'el.maxSizeMB = 10',
    },
    { name: 'disabled', angular: '[disabled]="true"', attr: 'disabled', js: 'el.disabled = true' },
    { name: 'files', angular: '[files]="files"', attr: '—', js: 'el.files = [...]' },
    {
      name: 'showFileList',
      angular: '[showFileList]="false"',
      attr: 'show-file-list="false"',
      js: 'el.showFileList = false',
    },
    {
      name: 'filesChange',
      angular: '(filesChange)="fn($event)"',
      attr: '—',
      js: `el.addEventListener('filesChange', fn)`,
    },
    {
      name: 'filesAdded',
      angular: '(filesAdded)="fn($event)"',
      attr: '—',
      js: `el.addEventListener('filesAdded', fn)`,
    },
    {
      name: 'fileRemove',
      angular: '(fileRemove)="fn($event)"',
      attr: '—',
      js: `el.addEventListener('fileRemove', fn)`,
    },
    {
      name: 'rejected',
      angular: '(rejected)="fn($event)"',
      attr: '—',
      js: `el.addEventListener('rejected', fn)`,
    },
  ];

  api: ApiRow[] = [
    {
      input: 'label',
      type: 'string',
      default: `'Drag & drop files here'`,
      description: 'Primary instruction text.',
    },
    {
      input: 'hint',
      type: 'string',
      default: `'or click to browse'`,
      description: 'Secondary line under the label.',
    },
    {
      input: 'accept',
      type: 'string',
      default: `''`,
      description:
        'Comma-separated file type filter — extensions (.pdf), MIME types (image/png), or wildcards (image/*). Empty accepts anything.',
    },
    {
      input: 'multiple',
      type: 'boolean | string',
      default: 'true',
      description: 'Allow selecting/dropping more than one file at a time.',
    },
    {
      input: 'maxSizeMB',
      type: 'number | null',
      default: 'null',
      description:
        'Per-file size limit in megabytes. Oversized files are rejected (see the rejected output), not silently dropped.',
    },
    {
      input: 'disabled',
      type: 'boolean | string',
      default: 'false',
      description: 'Disables click-to-browse and drag-and-drop.',
    },
    {
      input: 'files',
      type: 'DropzoneFile[]',
      default: '[]',
      description:
        "Current file list. Two-way in spirit — bind [files] down and listen to (filesChange) to keep your own state in sync (the component doesn't upload anything itself; drive status/progress from your own upload logic).",
    },
    {
      input: 'showFileList',
      type: 'boolean | string',
      default: 'true',
      description:
        'Show/hide the built-in file list below the drop area — turn off if you render your own list from the files array.',
    },
    {
      input: 'filesChange',
      type: 'EventEmitter<DropzoneFile[]> (output)',
      default: '—',
      description: 'Fires with the full updated file list whenever files are added or removed.',
    },
    {
      input: 'filesAdded',
      type: 'EventEmitter<DropzoneFile[]> (output)',
      default: '—',
      description: 'Fires with just the newly added files — the natural place to kick off uploads.',
    },
    {
      input: 'fileRemove',
      type: 'EventEmitter<DropzoneFile> (output)',
      default: '—',
      description: 'Fires when a file is removed via its list-item remove button.',
    },
    {
      input: 'rejected',
      type: 'EventEmitter<DropzoneRejection[]> (output)',
      default: '—',
      description:
        'Fires when dropped/selected files fail the accept or maxSizeMB check — each entry is {file, reason: "type"|"size"}.',
    },
  ];
}
