import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pui-file-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pui-file-btn">
      <!-- Trigger button -->
      <button class="pui-file-btn__trigger" [disabled]="disabled" (click)="openPicker()">
        {{ label }}
      </button>

      <!-- File type hint -->
      <span *ngIf="fileTypesLabel" class="pui-file-btn__hint">
        File type: <strong>{{ fileTypesLabel }}</strong>
      </span>

      <!-- Display area / drop zone -->
      <div class="pui-file-btn__area" [class.pui-file-btn__area--filled]="selectedName">
        <span>{{ selectedName || placeholder }}</span>
      </div>

      <!-- Hidden native input -->
      <input #fileInput type="file" [accept]="accept" [multiple]="multiple"
             style="display:none" (change)="onFileChange($event)">
    </div>
  `,
  styles: [`
    :host { display: block; }

    .pui-file-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-family: inherit;
    }

    .pui-file-btn__trigger {
      padding: 9px 20px;
      background: #ebebf5;
      color: #2c2c52;
      border: 2px solid #d8d8ee;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;
      white-space: nowrap;
      &:hover:not(:disabled) { background: #d8d8ee; }
      &:focus-visible        { outline: none; box-shadow: 0 0 0 3px rgba(44,44,82,.25); }
      &:disabled             { opacity: 0.4; cursor: not-allowed; }
    }

    .pui-file-btn__hint {
      font-size: 13px;
      color: #6b7280;
      white-space: nowrap;
    }

    .pui-file-btn__area {
      flex: 1;
      min-width: 140px;
      padding: 9px 18px;
      background: #d0d0d8;
      border-radius: 999px;
      font-size: 13px;
      color: #6b6b9a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &--filled { color: #2c2c52; background: #ebebf5; }
    }
  `],
})
export class FileUploadButtonComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  @Input() label = 'Upload';
  @Input() placeholder = 'No file chosen';
  @Input() fileTypesLabel = '';
  @Input() accept = '*';
  @Input() multiple = false;
  @Input() disabled = false;

  @Output() fileSelected  = new EventEmitter<FileList>();
  @Output() buttonClick   = new EventEmitter<MouseEvent>();

  selectedName = '';

  openPicker(): void {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files || files.length === 0) return;
    this.selectedName = files.length === 1
      ? files[0].name
      : `${files.length} files selected`;
    this.fileSelected.emit(files);
  }
}
