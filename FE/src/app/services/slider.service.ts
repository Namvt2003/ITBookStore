import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Slider } from '../../models/slider.model';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private pageUrl="http://localhost:8080/api/sliders";
  constructor(private http: HttpClient) { }

  getSliderItems():Observable<Slider[]>{
    return this.http.get<Slider[]>(this.pageUrl);
  }


  getSliderById(id: number): Observable<Slider>{
    return this.http.get<Slider>(this.pageUrl + '/' + id);
  }

}
