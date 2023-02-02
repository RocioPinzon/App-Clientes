import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes'
  constructor(private http:HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES); // of() Convertimos nuestro listado clientes en un observable, en este caso en un string.
    return this.http.get<Cliente[]>(this.urlEndPoint)  //una forma casteada
    /*return this.http.get(this.urlEndPoint).pipe( //metodho pipe, permite agregar mas operadores.
      map(response => response as Cliente[])
    );*/
  };
}
