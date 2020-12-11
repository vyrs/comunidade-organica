import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../seguranca/auth.service';
import { ClienteRepository } from './../repository/cliente-repository';

@Component({
  selector: 'app-painel-dashboard',
  templateUrl: './painel-dashboard.component.html',
  styleUrls: ['./painel-dashboard.component.css']
})
export class PainelDashboardComponent implements OnInit {

  data: any;
  t: string = "janeiro";
  data1: number=0;
  constructor(private clienteRepository: ClienteRepository, private authService: AuthService) { 
    
  }

  ngOnInit(): void {

   this.getDadosDashboard(this.authService.pegaIdUser);
  }


  chartOptions = {
    title: {
      display: true,
      text: 'Gráficos de Vendas'
         
      
    },
    legend: {
      position: 'bottom'
    },
    layout: {

      padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
      },      
    },
    rotation: -5.5 * Math.PI,
    circumference: 2 * Math.PI,
    animation: {
      animateRotate: true,
      animateScale: true
    },
    /* onClick: this.onClick */
    
  };

  getDadosDashboard(id: number){

    const date = new Date();
    let mes = date.getMonth();
    let limite = mes -5;
    let dados=[0,0,0,0,0];
    let aux =0;
    let nomeMeses=[];
    this.clienteRepository.getDadosDashboard(id).subscribe(resp => {

      for(let i=0; i < 5; i++){
        
        if( (mes+1) == resp.mes){
          dados[aux] += resp.preco;
          nomeMeses[aux] = resp.nomeMes + " valor ganho de R$";
        }
        mes--;
        aux++;
        if(limite == mes){
          mes = date.getMonth();
          aux=0;
        }
      }
     
    /* console.log(nomeMeses) */
    //console.log(dados);
      

      this.data = {
        labels: [ nomeMeses[0] , nomeMeses[1], nomeMeses[2],
        nomeMeses[3],nomeMeses[4]],
        datasets: [
            {
                data: [ 
                  dados[0].toFixed(2) , 
                  dados[1].toFixed(2) ,
                  dados[2].toFixed(2) ,
                  dados[3].toFixed(2) ,
                  dados[4].toFixed(2) ],
                backgroundColor: [
                    "#006400",
                    "#36A2EB",
                    "#FFCE56",
                    "##00FF00",
                    "#D2691E"
                ],
                hoverBackgroundColor: [
                    "#7CFC00",
                    "#7CFC00",
                    "#7CFC00",
                    "#7CFC00",
                    "#7CFC00"
                ]
            }]    
        };

    })
  }

  onClick	(){
    console.log("Clicando")
    
  }
}
