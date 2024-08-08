import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileinputService {
  private baseUrl = 'http://localhost:8080/api/fileinput';
  constructor(private http: HttpClient) { }

  uploadCSVFiles(files: File[]): Observable<string> {
    const formData: FormData = new FormData();
    files.forEach((file, index) => {
      formData.append('files', file, file.name);
    });
    return this.http.post(`${this.baseUrl}`, formData, { responseType: 'text' });
  }
}
