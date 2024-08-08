import { HttpContextToken, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from './services/loading.service';
import { inject } from '@angular/core';

export const SkipLoading = new HttpContextToken(() => false);


export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<any> , next: HttpHandlerFn):Observable<HttpEvent<any>> => {
   const loadingService = inject(LoadingService);
  if (req.context.get(SkipLoading)) {
    // Pass the request directly to the next handler
    return next(req);
  }

  // Turn on the loading spinner
  loadingService.loadingOn();

  return next(req).pipe(
    finalize(() => {
      // Turn off the loading spinner
      loadingService.loadingOff();
    })
  );
}
;
