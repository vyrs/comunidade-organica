import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-area-produto',
  templateUrl: './area-produto.component.html',
  styleUrls: ['./area-produto.component.css']
})
export class AreaProdutoComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.navigate(['cadastra-produto'], { relativeTo : this.route});
  }

   /* start metodos para chama rotas filhas */
  showProduto(){
    this.router.navigate(['cadastra-produto'], { relativeTo : this.route});
  }  
  showMeusAnuncios(){
    this.router.navigate(['area-meus-anuncios'], { relativeTo : this.route});
  }
   /* end metodos para chama rotas filhas */
}
