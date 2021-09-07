import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  getMessage(err: HttpErrorResponse): string {
    let msg = '';
    if (err.error) {
      if (err.error.error !== '') {
        msg = err.error.error;
      } else {
        if (err.error instanceof Object && err.message !== '') {
          msg = err.message;
        } else {
          msg = err.error;
        }
      }
    } else {
      msg = err.message;
    }
    return msg;
  }
}
