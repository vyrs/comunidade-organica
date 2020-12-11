import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinnerService: NgxSpinnerService) { }

  public openSpinner(){
    this.spinnerService.show(undefined, {
      type: 'pacman'
      /* 
      square-jelly-box, pacman, ball-atom,ball-climbing-dot
       */
    });
  }
  public closeSpinner(){
    setTimeout(() => {
      this.spinnerService.hide();
    },2000)

  }
}
