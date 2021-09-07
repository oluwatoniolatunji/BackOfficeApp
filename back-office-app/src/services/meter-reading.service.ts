import { MeterReadingDto } from './../dto/meter-reading-dto';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base.service';
import { ApiResponseDto } from 'src/dto/api-response-dto';
import { UploadResultDto } from 'src/dto/upload-result-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeterReadingService extends BaseService {
  baseUrl: string;
  service: string;
  method!: string;

  constructor(@Inject(HttpClient) httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = environment.config.meterReadingService;
    this.service = 'api/meter-reading'
  }

  uploadMeterReading(file: File): Observable<ApiResponseDto<UploadResultDto>> {
    this.method = 'meter-reading-uploads';
    const formData = new FormData();
    formData.append("formFile", file, file.name);
    return this.post(formData);
  }

  saveMeterReading(meterReadingDto: MeterReadingDto): Observable<ApiResponseDto<any>> {
    this.method = 'readings';
    return this.post(meterReadingDto);
  }

  getMeterReading(accountId: number): Observable<ApiResponseDto<MeterReadingDto[]>> {
    const url = `${this.baseUrl}/${this.service}/accounts/${accountId}/readings`;
    return this.get(url);
  }

}
