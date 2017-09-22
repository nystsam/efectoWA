import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('header') header;

    @ViewChild('content') content;

    public imageHeight: number = 0;

    private opacitiyValue: number = 0;

    private lastScrollValue: number = 0;

    private showFixedHeader: boolean = false;

    constructor(
        public navCtrl: NavController
    ) {}

    ionViewDidLoad(): void {
        this.imageHeight = this.header.nativeElement.firstElementChild.offsetWidth;
        this.header.nativeElement.firstElementChild.style.backgroundImage = 'url(../assets/public/profile.jpg)';
        this.header.nativeElement.firstElementChild.style.height = this.header.nativeElement.firstElementChild.offsetWidth + 'px';
        this.content._elementRef.nativeElement.lastChild.addEventListener('scroll', evt => {
            if( evt.target.scrollTop >= (this.imageHeight * 0.25)){
                let _min: number = this.imageHeight - 100;
                let _max: number = Math.round(this.imageHeight * 0.25);
                let _value: number = (Math.abs(evt.target.scrollTop - _max))/(Math.abs(_min - _max));
                if(this.lastScrollValue < evt.target.scrollTop){
                    this.opacitiyValue = 1 - _value;
                    if(this.opacitiyValue <= 0){
                        this.opacitiyValue = 0;
                        this.showFixedHeader = true;
                    }
                } else{
                    this.opacitiyValue =  0 + (1 - _value);
                }
                this.lastScrollValue = evt.target.scrollTop;
                this.header.nativeElement.firstElementChild.style.opacity = this.opacitiyValue;
                if(this.opacitiyValue > 0){
                    this.showFixedHeader = false;
                }
            } else {
                this.header.nativeElement.firstElementChild.style.opacity = 1;
            }
        });

/*
        this.viewPortWidth = this.header.nativeElement.firstElementChild.offsetWidth;
        this.arrowTop = ((this.viewPortWidth * 30) /100) - 70 + 'px';
        this.header.nativeElement.firstElementChild.style.height = this.header.nativeElement.firstElementChild.offsetWidth + 'px';
        this.content._elementRef.nativeElement.lastChild.addEventListener('scroll', evt => {
            if (this.header){
                
                this.header.nativeElement.firstElementChild.style.opacity = 1 - (evt.target.scrollTop/((this.viewPortWidth*65)/100));
                this.header.nativeElement.firstElementChild.style.height = this.header.nativeElement.firstElementChild.offsetWidth + 'px';
            }
            if ( (this.viewPortWidth - evt.target.scrollTop) <= (this.viewPortWidth * 30) /100 ){
                this.showFixedHeader = true;
                this.firstTime = true;
                setTimeout( () =>{
                    
                    this.transition = true;
                    this.transitionAbsolute = false;
                }, 50);
                
            }else{
                this.showFixedHeader = false;
                this.transition = false;
                if(this.firstTime){

                    setTimeout( () => this.transitionAbsolute = true, 50 );
                }
                
            }
*/
    }

}
