import { Component } from '@angular/core';
import { FileinputService } from '../services/fileinput.service';

@Component({
  selector: 'app-fileinput',
  templateUrl: './fileinput.component.html',
  styleUrls: ['./fileinput.component.css']
})
export class FileinputComponent {
  files: File[] = [];
  isUploading = false;
  uploadResult = '';
  uploadSuccess = false;

  constructor(private fileinputService: FileinputService) {}

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList = element.files;
    if (fileList) {
      this.handleFiles(fileList);
    }
  }

  handleFiles(fileList: FileList) {
    this.files = Array.from(fileList);
    console.log('Files to upload:', this.files);
  }

  uploadCSVFiles() {
    console.log('uploadCSVFiles method called');
    const csvFiles = this.files.filter(file => file.name.endsWith('.csv'));
    if (csvFiles.length > 0) {
      this.isUploading = true;
      this.uploadResult = '';
      this.fileinputService.uploadCSVFiles(csvFiles).subscribe(
        response => {
          console.log('Upload and import successful:', response);
          this.uploadResult = 'Upload successful: ' + response;
          this.uploadSuccess = true;
          this.files = this.files.filter(file => !file.name.endsWith('.csv'));
          this.isUploading = false;
        },
        error => {
          console.error('Upload and import failed:', error);
          this.uploadResult = 'Upload failed: ' + error.message;
          this.uploadSuccess = false;
          this.isUploading = false;
        }
      );
    } else {
      this.uploadResult = 'No CSV files found';
      this.uploadSuccess = false;
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const fileList = event.dataTransfer?.files;
    if (fileList) {
      this.handleFiles(fileList);
    }
  }
}