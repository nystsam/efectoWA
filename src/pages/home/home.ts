import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('header') header;

    @ViewChild('titleAdjuster') titleAdjuster;

    @ViewChild('titleText') titleText;

    @ViewChild('backButton') backButton;

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
        this.backButton.nativeElement.style.top = (this.imageHeight * 0.1) + 3 + 'px';
        this.header.nativeElement.firstElementChild.style.height = this.header.nativeElement.firstElementChild.offsetWidth + 'px';
        this.content._elementRef.nativeElement.lastChild.addEventListener('scroll', evt => {
            this.backButtonTransition(evt.target.scrollTop);
            if( evt.target.scrollTop >= (this.imageHeight * 0.35)){
                let _max: number = this.imageHeight - 80;
                let _min: number = Math.round(this.imageHeight * 0.35);
                let _value: number = (Math.abs(evt.target.scrollTop - _min))/(Math.abs(_max - _min));
                if(this.lastScrollValue < evt.target.scrollTop){
                    this.opacitiyValue = 1 - _value;
                    if(this.opacitiyValue <= 0){
                        this.opacitiyValue = 0;
                        this.showFixedHeader = true;
                    }
                } else{
                    this.opacitiyValue =  0 + (1 - _value);
                    
                }
                this.titleTrasition(_value);
                this.colorTransition(1 - _value, this.titleText);
                this.colorTransition(1 - _value, this.backButton);
                this.lastScrollValue = evt.target.scrollTop;
                this.header.nativeElement.firstElementChild.style.opacity = this.opacitiyValue;
                if(this.opacitiyValue > 0){
                    this.showFixedHeader = false;
                }
            } else {
                this.header.nativeElement.firstElementChild.style.opacity = 1;
                this.titleAdjuster.nativeElement.style.width  = 20 + 'px';
                this.titleText.nativeElement.style.color = 'rgb(255, 255, 255)';
                this.backButton.nativeElement.style.color = 'rgb(255, 255, 255)';

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

    private backButtonTransition(_scrollValue: number): void{
        let _maxScroll: number = this.imageHeight + 200;
        let _minScroll: number = 0;
        let _value: number = (Math.abs(_scrollValue - _minScroll))/(Math.abs(_maxScroll - _minScroll));

        let _min: number = (this.imageHeight * 0.1);
        let _max: number = this.imageHeight + 200;
        let _topValue: number = _value * (Math.abs(_min - _max)) + _min + 3;
        this.backButton.nativeElement.style.top = _topValue + 'px';
            

    }

    private titleTrasition(_normalizedValue: number): void {
        let _min: number = 20;
        let _max: number = 60;
        let _widthValue: number = _normalizedValue * (Math.abs(_min - _max)) + _min;
        
        if(_widthValue >= _min && _widthValue <= _max)
            this.titleAdjuster.nativeElement.style.width = _widthValue + 'px';
    }

    private colorTransition(_normalizedValue: number, _element: any): void {
        //rgb(255, 255, 255);
        //rgb(221, 74, 88);
        let _maxR: number = 255;
        let _maxG: number = 255;
        let _maxB: number = 255;
        let _minR: number = 221;
        let _minG: number = 74;
        let _minB: number = 88;

        let _rValue: number = _normalizedValue * (Math.abs(_minR - _maxR)) + _minR;
        let _gValue: number = _normalizedValue * (Math.abs(_minG - _maxG)) + _minG;
        let _bValue: number = _normalizedValue * (Math.abs(_minB - _maxB)) + _minB;
                
        if( (_rValue >= _minR && _rValue <= _maxR) && 
            (_gValue >= _minG && _gValue <= _maxG) && 
            (_bValue >= _minB && _bValue <= _maxB))
            _element.nativeElement.style.color = 'rgb('+ Math.round(_rValue) +', '+ Math.round(_gValue) +', '+ Math.round(_bValue) +')';
    }

}
