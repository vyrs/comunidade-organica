import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'comunidadeorganica';
   

  constructor(private router: Router){ }

  get exibirNavbar() {
    return this.router.url !== '/login';
  }

 
}
