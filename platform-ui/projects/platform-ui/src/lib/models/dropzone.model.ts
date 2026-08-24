export type DropzoneFileStatus = 'pending' | 'uploading' | 'done' | 'error';

export interface DropzoneFile {
  id:      string;
  file:    File;
  name:    string;
  size:    number;
  status:  DropzoneFileStatus;
  /** 0–100. Only meaningful while status is 'uploading'. */
  progress?: number;
  errorMessage?: string;
}

export interface DropzoneRejection {
  file: File;
  reason: 'type' | 'size';
}
