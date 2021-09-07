import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  info(message: string, title: string): void {
    Swal.fire({
      title,
      text: message,
      icon: 'info',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#709a7d',
      cancelButtonColor: '#DC5960',
    });
  }
}
