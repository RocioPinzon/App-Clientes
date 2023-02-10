import { Injectable } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { of, Observable,throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs';
import swal from 'sweetalert2';

import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes'
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http:HttpClient, private router: Router) { }

  getClientes(page: number): Observable<any>{
    //return of(CLIENTES); // of() Convertimos nuestro listado clientes en un observable, en este caso en un string.
    //return this.http.get<Cliente[]>(this.urlEndPoint)  //una forma casteada
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe( //metodo pipe, permite agregar mas operadores.
      tap((response: any) => {
        console.log("ClienteService | Tap 1");
        (response.content as Cliente[]).forEach(cliente => {
          
          console.log(cliente.nombre);
        });
        }
      ),
      map((response: any) => {
        
          (response.content as Cliente[]).map(cliente =>{
          cliente.nombre= cliente.nombre.toUpperCase();
          //let datePipe = new DatePipe('es');          
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US')
          return cliente;
        });
        return response;
      }),
      tap(response => {
        
        console.log("ClienteService | Tap 2");

        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
        }
      ),
    );
  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post(this.urlEndPoint, cliente, {headers:this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {

        if(e.status == 400){ // Bad request

          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
        //return throwError(() => new Error(e));

      })
    );
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e =>{
        this.router.navigate(['/clientes']);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        
        if(e.status == 400){ // Bad request

          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
