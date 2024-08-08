import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingstateService {
  private loadingSubject = new BehaviorSubject<boolean>(true);
  public isLoading$: Observable<boolean> = this.loadingSubject.asObservable();

  private componentsLoaded = {
    navbar: false,
    contents: false,
    footer: false
  };

  setComponentLoaded(component: 'navbar' | 'contents' | 'footer') {
    this.componentsLoaded[component] = true;
    this.checkAllComponentsLoaded();
  }

  private checkAllComponentsLoaded() {
    if (Object.values(this.componentsLoaded).every(loaded => loaded)) {
      this.loadingSubject.next(false);
    }
  }
}