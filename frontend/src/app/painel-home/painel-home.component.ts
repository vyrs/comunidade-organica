import { SpinnerService } from './../services/spinner.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-painel-home',
  templateUrl: './painel-home.component.html',
  styleUrls: ['./painel-home.component.css']
})
export class PainelHomeComponent implements OnInit {

  apartirDesseMes: number =15;

  constructor(private router: Router, private route: ActivatedRoute,  private spinnerService: SpinnerService) { 
   
  }


  ngOnInit(): void {

 
    this.router.navigate(['painel-produto'], { relativeTo : this.route}); 
  }
   getDataAtual(){

    const date = new Date();

    const ano = date.getFullYear();
    const mes = date.getMonth();
    const data = date.getDate();
    let aux = mes;
    let aux2=12;
    /* for(let i=0; i < this.apartirDesseMes; i++ ){

      if(aux < 0){
        aux += aux2;
      }
      console.log("Meses para Dashboard: " + aux--);
    } */
    
    console.log("Data atual: "+data +"/"+(mes+1)+"/"+ano);


  }

}
