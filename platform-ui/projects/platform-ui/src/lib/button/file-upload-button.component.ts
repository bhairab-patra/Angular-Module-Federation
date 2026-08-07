import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pui-lib-file-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './file-upload-button.component.html',
  styleUrls: ['./file-upload-button.component.scss'],
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
