import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Transition, WidthTransition, OpacityTransition, ColorTransition, FontTransition, FilterTransition } from './transition-classes/transitions';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    // Es un @Input
    @ViewChild('content') content;

    @ViewChild('header') header: ElementRef;

    public imageUrl: string; // input

    public title: string; // input

    public subTitle: string = null; // input

    public subtitleImageUrl: string = null;

    public imageHeight: number = 0;

    public allowFixedHeader: boolean = false;

    private opacitiyValue: number = 0;

    private lastScrollValue: number = 0;

    private widthTransition: Transition;
    private opacityTransition: Transition;
    private colorTransition: Transition;
    private titleFontTransition: Transition;
    private buttonFontTransition: Transition;
    private subTitleFontTransition: Transition;
    private subTitleImgFilterTransition: Transition;

    constructor(
        public navParams: NavParams
    ) {
        this.subTitle = 'asd';
        this.subtitleImageUrl = 'https://impressjob.blob.core.windows.net/job-position-icons/barista-rojo.png';
        this.createTransitions();
     }

    ionViewDidLoad(): void {
        this.imageHeight = this.header.nativeElement.firstElementChild.offsetWidth;
        this.header.nativeElement.firstElementChild.style.height = this.header.nativeElement.firstElementChild.offsetWidth + 'px';
        this.imageUrl = 'url(https://about.canva.com/wp-content/uploads/sites/3/2016/08/Band-Logo.png)';
        

        this.content._elementRef.nativeElement.lastChild.addEventListener('scroll', evt => {
            this.headerOpacity(evt.target.scrollTop);
        });
    }

    /**
     * 
     */
    private headerOpacity(_scrollTop: number): void {
        if( _scrollTop >= (this.imageHeight * 0.35) ){
            let _max: number = this.imageHeight - 65;
            let _min: number = Math.round(this.imageHeight * 0.35);
            let _normalizedValue: number = (Math.abs(_scrollTop - _min))/(Math.abs(_max - _min));

            if(this.lastScrollValue < _scrollTop){
                this.opacitiyValue = 1 - _normalizedValue;
                if(this.opacitiyValue <= 0){
                    this.opacitiyValue = 0;
                    this.allowFixedHeader = true;
                }
            } else{
                this.opacitiyValue =  0 + (1 - _normalizedValue);
                if(this.opacitiyValue > 0){
                    this.allowFixedHeader = false;
                }
            }
            
            this.widthTransition.updateProperty(_normalizedValue);
            /*
            if(_scrollTop >= (this.imageHeight * 0.65)){
                this.opacityTransition.updateProperty(_normalizedValue);
            } else{
                this.opacityTransition.resetProperty();
            }
            */
            this.colorTransition.updateProperty(1 - _normalizedValue);
            this.titleFontTransition.updateProperty(1 - _normalizedValue);
            this.buttonFontTransition.updateProperty(1 - _normalizedValue);
            this.subTitleImgFilterTransition.updateProperty(1 - _normalizedValue);

            if(this.subTitle != null){
                this.subTitleFontTransition.updateProperty(1 - _normalizedValue);
            }

            this.lastScrollValue = _scrollTop;
            this.header.nativeElement.firstElementChild.style.opacity = this.opacitiyValue;
        } else {
            this.resetProperties();
        }
    }

    /**
     * 
     */
    private createTransitions(): void {
        let _maxTitleFont: number = 25;
        let _minTitleFont: number = 20;

        if(this.subTitle == null){
            _maxTitleFont = 27;
            _minTitleFont = 22;
        }

        this.widthTransition = new WidthTransition(20, 50);
        this.opacityTransition = new OpacityTransition(0, 1);
        this.colorTransition = new ColorTransition(0, 0);
        this.titleFontTransition = new FontTransition(_minTitleFont, _maxTitleFont);
        this.buttonFontTransition = new FontTransition(18, 24);
        this.subTitleFontTransition = new FontTransition(16, 20);
        this.subTitleImgFilterTransition = new FilterTransition(0, 1);
    }
    
    /**
     * 
     */
    private resetProperties(): void {
        this.header.nativeElement.firstElementChild.style.opacity = 1;
        this.widthTransition.resetProperty();
        this.colorTransition.resetProperty();
        this.titleFontTransition.resetProperty();
        this.buttonFontTransition.resetProperty();
        
        if(this.subTitle != null){
            this.subTitleFontTransition.resetProperty();
            if(this.subtitleImageUrl != null){
                this.subTitleImgFilterTransition.resetProperty();
            }
        }
        
    }

    /*
    private fontTranstition(_normalizedValue: number, _element: any, _min: number, _max: number): void{
        let _value: number = _normalizedValue * (Math.abs(_min - _max)) + _min;

        _element.nativeElement.style.fontSize = _value + 'px';
    }
    */
    /*
    private backButtonTransition(_scrollValue: number): void{
        let _maxScroll: number = this.imageHeight + 200;
        let _minScroll: number = 0;
        let _value: number = (Math.abs(_scrollValue - _minScroll))/(Math.abs(_maxScroll - _minScroll));
        let _min: number = (this.imageHeight * 0.1);
        console.log(_min);
        let _max: number = this.imageHeight + 200;
        console.log(_max);
        let _topValue: number = _value * (Math.abs(_min - _max)) + _min + 3;
        //console.log(_topValue);
        this.backButton.nativeElement.style.top = _topValue + 'px';
            

    }
    */
    /*
    private titleTrasition(_normalizedValue: number): void {
        let _min: number = 20;
        let _max: number = 50;
        let _widthValue: number = _normalizedValue * (Math.abs(_min - _max)) + _min;
        
        if(_widthValue >= _min && _widthValue <= _max)
            this.titleAdjuster.nativeElement.style.width = _widthValue + 'px';
    }
    */
    /*
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
    */

}
