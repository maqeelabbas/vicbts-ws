import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from './tokens/api-config.token';
import { PaginatedResult, PaginationParams } from './models/paginated-result';

export abstract class BaseApiService<T> {
  protected http = inject(HttpClient);
  protected config = inject(API_CONFIG);
  
  protected abstract get endpoint(): string;
  
  protected get baseUrl(): string {
    return `${this.config.baseUrl}/${this.endpoint}`;
  }

  getList(params?: PaginationParams): Observable<PaginatedResult<T>> {
    let httpParams = new HttpParams();
    
    if (params) {
      if (params.page !== undefined) {
        httpParams = httpParams.set('page', params.page.toString());
      }
      if (params.pageSize !== undefined) {
        httpParams = httpParams.set('pageSize', params.pageSize.toString());
      }
      if (params.sortBy) {
        httpParams = httpParams.set('sortBy', params.sortBy);
      }
      if (params.sortOrder) {
        httpParams = httpParams.set('sortOrder', params.sortOrder);
      }
    }
    
    return this.http.get<PaginatedResult<T>>(this.baseUrl, { params: httpParams });
  }

  getById(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  create(data: Partial<T>): Observable<T> {
    return this.http.post<T>(this.baseUrl, data);
  }

  update(id: string | number, data: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
