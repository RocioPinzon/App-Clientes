import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Aplicación para clientes';
  curso: string = 'Curso Spring 5 con Angular';
  autor: string = 'Rocio Pinzón Bayón';

}
