import { AccountDto } from './../dto/account-dto';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base.service';
import { ApiResponseDto } from 'src/dto/api-response-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {

  baseUrl: string;
  service: string;
  method!: string;

  constructor(@Inject(HttpClient) httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = environment.config.accountManagementService;
    this.service = 'api/account-management'
  }

  saveAccount(accountDto: AccountDto): Observable<ApiResponseDto<any>> {
    this.method = 'accounts';
    return this.post(accountDto);
  }

  updateAccount(accountId: number, accountDto: AccountDto): Observable<ApiResponseDto<any>> {
    this.method = `accounts/${accountId}`;
    return this.post(accountDto);
  }

  getAccount(accountId: number): Observable<ApiResponseDto<AccountDto>> {
    this.method = `accounts/${accountId}`;
    const url = `${this.baseUrl}/${this.service}/${this.method}`;
    return this.get(url);
  }

  getAccounts(): Observable<ApiResponseDto<AccountDto[]>> {
    this.method = 'accounts';
    const url = `${this.baseUrl}/${this.service}/${this.method}`;
    return this.get(url);
  }

}
