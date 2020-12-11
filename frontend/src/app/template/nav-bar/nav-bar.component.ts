import { Router } from '@angular/router';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  usuario: string = '';  

  constructor(public service: AuthService, public router: Router, public location: Location) {

    this.usuario = service.jwtPayload ? service.jwtPayload.user_name : ''; 
    
      
  }

  ngOnInit(): void {  
  
    
  }

  
  logout() {
    
    this.service.logout(); 
  }
 
}
