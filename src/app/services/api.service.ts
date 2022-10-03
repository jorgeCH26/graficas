import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { Solicitudes } from '../models/dashboard/dashboardModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.api;
  errorHandl: any;
  constructor(private http: HttpClient) { }

  getSolicitides(): Observable<Solicitudes> {
    const url = this.baseUrl + 'solicitudes/';
    return this.http.get<Solicitudes>(url);
  }

  getQuejas() {
    const url = this.baseUrl + 'quejas/';
    return this.http.get(url);
  }

  getCrecimiento() {
    const url = this.baseUrl + 'crecimiento/';
    return this.http.get(url);
  }

  getperdidas() {
    const url = this.baseUrl + 'perdidas/';
    return this.http.get(url);
  }

  getPorcentaje() {
    const url = this.baseUrl + 'porcentaje/';
    return this.http.get(url);
  }

  getSaldos() {
    const url = this.baseUrl + 'saldos/';
    return this.http.get(url);
  }

  getIngresosRetiros() {
    const url = this.baseUrl + 'ingresos/';
    return this.http.get(url);
  }


  getAcciones() {
    const url = this.baseUrl + 'acciones/';
    return this.http.get(url);
  }

  getMovimentos() {
    const url = this.baseUrl + 'movimentos/';
    return this.http.get(url);
  }

}
