import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit{

  public cliente: Cliente = new Cliente(); //Deberia de poner private ?? pero no funciona. De momento Public
  public titulo: string = "Crear cliente";

  constructor(private clienteService: ClienteService, private router: Router,
    private activateRoute: ActivatedRoute){
  }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void{
    this.activateRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe((cliente) =>this.cliente = cliente)
      }
    })
  }

  create(): void{
    this.clienteService.create(this.cliente)
    .subscribe(cliente =>{
        this.router.navigate(['/clientes'])
        swal.fire('Cliente guardado', `Cliente ${cliente.nombre} creado con éxito`, 'success' )
    }
  )}

  update(): void{
    this.clienteService.update(this.cliente)
    .subscribe(cliente => {
      this.router.navigate(['/clientes'])
      swal.fire('Cliente actualizado', `Cliente ${cliente.nombre} actualizado con éxito`, 'success' )

    })
  }

}
