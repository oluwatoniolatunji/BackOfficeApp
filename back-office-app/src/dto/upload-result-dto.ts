import { MeterReadingDto } from './meter-reading-dto';
export class UploadResultDto {
  successfulReadings!: MeterReadingDto[];
  failedReadings!: MeterReadingDto[];
}
