import {
  Component, Input, Output, EventEmitter, ViewChild, ElementRef,
  ViewEncapsulation, ChangeDetectionStrategy,
} from '@angular/core';
import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { DropzoneFile, DropzoneRejection } from '../models/dropzone.model';

let uid = 0;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pui-lib-dropzone',
  standalone: true,
  imports: [NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, IconComponent],
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
})
export class PuiDropzoneComponent {
  @Input() label = 'Drag & drop files here';
  @Input() hint = 'or click to browse';
  @Input() accept = '';
  @Input() maxSizeMB: number | null = null;

  @Input() set multiple(v: boolean | string) {
    this._multiple = v !== false && v !== 'false';
  }
  get multiple(): boolean { return this._multiple; }
  private _multiple = true;

  @Input() set disabled(v: boolean | string) {
    this._disabled = v === true || v === 'true' || (v as any) === '';
  }
  get disabled(): boolean { return this._disabled; }
  private _disabled = false;

  @Input() set showFileList(v: boolean | string) {
    this._showFileList = v !== false && v !== 'false';
  }
  get showFileList(): boolean { return this._showFileList; }
  private _showFileList = true;

  @Input() set files(v: DropzoneFile[]) { this._files = v || []; }
  get files(): DropzoneFile[] { return this._files; }
  private _files: DropzoneFile[] = [];

  @Output() filesChange  = new EventEmitter<DropzoneFile[]>();
  @Output() filesAdded   = new EventEmitter<DropzoneFile[]>();
  @Output() fileRemove   = new EventEmitter<DropzoneFile>();
  @Output() rejected     = new EventEmitter<DropzoneRejection[]>();

  dragging = false;

  @ViewChild('fileInput') private fileInputRef!: ElementRef<HTMLInputElement>;

  openPicker(): void {
    if (this.disabled) return;
    this.fileInputRef.nativeElement.click();
  }

  onFileInputChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    this._ingest(input.files);
    input.value = '';
  }

  onDrop(e: DragEvent): void {
    e.preventDefault();
    this.dragging = false;
    if (this.disabled) return;
    this._ingest(e.dataTransfer?.files ?? null);
  }

  onDragOver(e: DragEvent): void {
    e.preventDefault();
    if (!this.disabled) this.dragging = true;
  }

  onDragLeave(e: DragEvent): void {
    e.preventDefault();
    this.dragging = false;
  }

  removeFile(f: DropzoneFile): void {
    this._files = this._files.filter(x => x.id !== f.id);
    this.filesChange.emit(this._files);
    this.fileRemove.emit(f);
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  trackById(_: number, f: DropzoneFile): string { return f.id; }

  private _ingest(list: FileList | null): void {
    if (!list || !list.length || this.disabled) return;

    const incoming = this.multiple ? Array.from(list) : [list[0]];
    const accepted: File[] = [];
    const rejectedFiles: DropzoneRejection[] = [];

    for (const file of incoming) {
      if (!this._matchesAccept(file)) { rejectedFiles.push({ file, reason: 'type' }); continue; }
      if (this.maxSizeMB != null && file.size > this.maxSizeMB * 1024 * 1024) {
        rejectedFiles.push({ file, reason: 'size' });
        continue;
      }
      accepted.push(file);
    }

    if (rejectedFiles.length) this.rejected.emit(rejectedFiles);
    if (!accepted.length) return;

    const added: DropzoneFile[] = accepted.map(file => ({
      id: `dz-${++uid}`,
      file,
      name: file.name,
      size: file.size,
      status: 'pending',
    }));

    this._files = this.multiple ? [...this._files, ...added] : added;
    this.filesChange.emit(this._files);
    this.filesAdded.emit(added);
  }

  private _matchesAccept(file: File): boolean {
    if (!this.accept || this.accept.trim() === '' || this.accept.trim() === '*/*') return true;
    const patterns = this.accept.split(',').map(p => p.trim()).filter(Boolean);
    return patterns.some(pattern => {
      if (pattern.startsWith('.')) return file.name.toLowerCase().endsWith(pattern.toLowerCase());
      if (pattern.endsWith('/*')) return file.type.startsWith(pattern.slice(0, -1));
      return file.type === pattern;
    });
  }
}
