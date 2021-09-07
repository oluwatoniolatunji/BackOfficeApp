import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponseDto } from './../dto/api-response-dto';
import { MeterReadingService } from './../services/meter-reading.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NotificationService } from 'src/services/notification.service';
import { ErrorHandlerService } from 'src/services/error-handler.service';
import { UploadResultDto } from 'src/dto/upload-result-dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  file!: any;
  isLoading = false;
  uploadResult!: UploadResultDto | undefined;

  @ViewChild('formFile')
  formFile!: ElementRef;

  constructor(
    private meterReadingService: MeterReadingService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService) {

  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

  onUpload(): void {

    this.isLoading = true;
    this.meterReadingService.uploadMeterReading(this.file).subscribe(
      (response: ApiResponseDto<UploadResultDto>) => {
        this.isLoading = false;
        console.log(response);
        if (response.isSuccessful) {
          this.uploadResult = response.data;
          this.onReset();
        } else {
          this.notificationService.info(response.error, 'Upload Meter Reading');
        }
      },
      (httpErrorResponse: HttpErrorResponse) => {
        this.isLoading = false;
        const errorMessage = this.errorHandlerService.getMessage(httpErrorResponse);
        this.notificationService.info(errorMessage, 'Upload Meter Reading');
      }
    );
  }

  onReset() {
    this.formFile.nativeElement.value = "";
    this.file = null;
  }
}
