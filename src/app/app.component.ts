import { Component, ElementRef, VERSION, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  @ViewChild("stopBtn") stopBtn: ElementRef;
  @ViewChild("startBtn") startBtn: ElementRef;
  badgeCounter: number;
  startBtnDisabled:boolean;
  stopBtnDisabled: boolean;
  canIncre: boolean;

  private timerSubscription: Subscription;

  constructor() {
    this.badgeCounter=0;
    this.startBtnDisabled=false;
    this.stopBtnDisabled=true;
    this.canIncre=true;
  }

  startBadgeIncre() {
    this.startBtnDisabled=true;
    this.stopBtnDisabled=false;
    this.stopBtn.nativeElement.classList.remove("mat-button-disabled");
    this.startBtn.nativeElement.classList.add("mat-button-disabled");
    this.canIncre=true;
    if (!this.timerSubscription || this.timerSubscription.closed) {
      this.timerSubscription= interval(300).subscribe(() => {
        if (this.canIncre) {
          this.badgeCounter++;
        }
      });
    }
  }

  stopBadgeIncre() {
    this.startBtnDisabled=false;
    this.stopBtnDisabled=true;
    this.stopBtn.nativeElement.classList.add("mat-button-disabled");
    this.startBtn.nativeElement.classList.remove("mat-button-disabled");
    this.canIncre=false;
    if (this.timerSubscription && !this.timerSubscription.closed) {
      this.timerSubscription.unsubscribe();
    }
  }

  clear(){
    this.badgeCounter=0;  
  }
}
