import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../app/environments/environment.service';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private apiUrl = `${environment.apiUrl}/vendas`;

  constructor(private http: HttpClient) { }

  venderProduto(produtoId: number, quantidade: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/vender`, null, {
      params: {
        produtoId: produtoId.toString(),
        quantidadeVendida: quantidade.toString()
      }
    });
  }

  obterExtratoVendas(dataInicio: string, dataFim: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/extrato`, {
      params: { 
        dataInicio: dataInicio,
        dataFim: dataFim
      }
    }).pipe(
      tap(response => console.log('Resposta da API:', response)), 
      catchError(error => {
        console.error('Erro na requisição:', error);
        return throwError(() => error);
      })
    );
  }
  }
