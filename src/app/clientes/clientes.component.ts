import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})

export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService){}

  ngOnInit(): void {
    let page = 0;
    this.clienteService.getClientes(page)
    .pipe(
      tap(response =>{
        console.log("ClientesComponent | Tap 3");

        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      })
    )
    .subscribe(response => this.clientes = response.content as Cliente[]); // Funcion anonima.
    
  }

  delete(cliente: Cliente): void{
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `No podrá recuperar el cliente ${cliente.nombre}  ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.delete(cliente.id).subscribe(
          response =>{
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado',
              `El cliente ${cliente.nombre}  ${cliente.apellido} ha sido eliminado`,
              'success'
            )
          }
        );
       
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
}
