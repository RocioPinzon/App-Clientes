import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes'
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http:HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES); // of() Convertimos nuestro listado clientes en un observable, en este caso en un string.
    //return this.http.get<Cliente[]>(this.urlEndPoint)  //una forma casteada
    return this.http.get(this.urlEndPoint).pipe( //metodo pipe, permite agregar mas operadores.
      map(response => response as Cliente[])
    );
  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers:this.httpHeaders});
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente,{headers: this.httpHeaders});
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }
}
