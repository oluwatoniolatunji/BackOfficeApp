export class ApiResponseDto<T> {
  isSuccessful!: boolean;
  data!: T;
  error!: string;
}
