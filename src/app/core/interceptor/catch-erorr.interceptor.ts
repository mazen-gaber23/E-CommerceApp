import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
export const catchErorrInterceptor: HttpInterceptorFn = (req, next) => {
  let toastr=inject(ToastrService)
  return next(req).pipe(catchError((err)=>{

    console.log(err);
    toastr.error(err.error.message)

    
    return throwError(()=>err)
  }));
};
