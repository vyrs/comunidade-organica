import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-painel-area-logada',
  templateUrl: './painel-area-logada.component.html',
  styleUrls: ['./painel-area-logada.component.css']
  
})
export class PainelAreaLogadaComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.navigate(['perfil'], { relativeTo : this.route});     
   
  }

  /* start metodos para chama rotas filhas */
  showPerfil(){

    this.router.navigate(['perfil'], { relativeTo : this.route});
    
  }
  showDashBoard(){
    this.router.navigate(['dashboard'], { relativeTo : this.route});
  }
  showAreaProduto(){
    this.router.navigate(['area-produto/cadastra-produto'], { relativeTo : this.route});
  }
  
  /* end metodos para chama rotas filhas */

  get exibirRodape(){
    return this.router.url !== '/area-logada/area-produto/cadastra-produto';
  }
}
