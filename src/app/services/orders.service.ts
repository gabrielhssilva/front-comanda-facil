import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  public getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urlFull}/pedidos`).pipe(take(1));
  }

  public deleteOrder(id: string): Observable<any[]> {
    return this.http
      .delete<any>(`${environment.urlFull}/pedido/${id}`)
      .pipe(take(1));
  }

  public createOrder(order: any): Observable<any> {
    return this.http
      .post<any>(`${environment.urlFull}/pedido`, order)
      .pipe(take(1));
  }

  public updateOrder(orderId: string, data: any): Observable<any> {
    return this.http
      .put<any>(`${environment.urlFull}/pedido/${orderId}`, data)
      .pipe(take(1));
  }
}
