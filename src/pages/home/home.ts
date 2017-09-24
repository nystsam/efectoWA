import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Transition, WidthTransition, ColorTransition, FontTransition, TopTransition, FilterTransition } from './transition-classes/transitions';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    // Es un @Input
    @ViewChild('content') content;




    @ViewChild('header') header: ElementRef;

    @ViewChild('titleAdjusterElement') titleAdjuster: ElementRef;

    @ViewChild('titleElement') titleElement: ElementRef;

    @ViewChild('subTitleElement') subTitleElement: ElementRef;

    @ViewChild('subTitleImgElement') subTitleImgElement: ElementRef

    @ViewChild('backButtonElement') backButtonElement: ElementRef;

    public imageUrl: string; // input

    public title: string; // input

    public subTitle: string = null; // input

    public subtitleImageUrl: string = null;

    public imageHeight: number = 0;

    public showFixedHeader: boolean = false;

    private opacitiyValue: number = 0;

    private lastScrollValue: number = 0;

    private widthTransition: Transition;
    private titleColorTransition: Transition;
    private titleFontTransition: Transition;
    private buttonColorTransition: Transition;
    private buttonFontTransition: Transition;
    private buttonTopTransition: Transition;
    private subTitleColorTransition: Transition;
    private subTitleFontTransition: Transition;
    private subTitleImgFilterTransition: Transition;

    constructor(
        public navParams: NavParams
    ) {
        this.subTitle = 'asd';
     }

    ionViewDidLoad(): void {
        this.imageHeight = this.header.nativeElement.firstElementChild.offsetWidth;
        this.header.nativeElement.firstElementChild.style.height = this.header.nativeElement.firstElementChild.offsetWidth + 'px';
        this.imageUrl = 'url(https://www.logogarden.com/wp-content/uploads/lg-index/Example-Logo-6.jpg)';
        this.subtitleImageUrl = 'https://impressjob.blob.core.windows.net/job-position-icons/barista-rojo.png';
        this.backButtonElement.nativeElement.style.top = (this.imageHeight * 0.08) + 'px';

        this.createTransitions();

        this.content._elementRef.nativeElement.lastChild.addEventListener('scroll', evt => {
            this.buttonTopTransition.updateProperty(evt.target.scrollTop);
            this.headerOpacity(evt.target.scrollTop);
        });
    }

    /**
     * 
     */
    private headerOpacity(_scrollTop: number): void {
        if( _scrollTop >= (this.imageHeight * 0.35)){
            let _max: number = this.imageHeight - 65;
            let _min: number = Math.round(this.imageHeight * 0.35);
            let _normalizedValue: number = (Math.abs(_scrollTop - _min))/(Math.abs(_max - _min));

            if(this.lastScrollValue < _scrollTop){
                this.opacitiyValue = 1 - _normalizedValue;
                if(this.opacitiyValue <= 0){
                    this.opacitiyValue = 0;
                    this.showFixedHeader = true;
                }
            } else{
                this.opacitiyValue =  0 + (1 - _normalizedValue);
                
            }
            this.widthTransition.updateProperty(_normalizedValue);
            this.titleColorTransition.updateProperty(1 - _normalizedValue);
            this.titleFontTransition.updateProperty(1 - _normalizedValue);
            this.buttonColorTransition.updateProperty(1 - _normalizedValue);
            this.buttonFontTransition.updateProperty(1 - _normalizedValue);
            this.subTitleImgFilterTransition.updateProperty(1 - _normalizedValue);

            if(this.subTitle != null){
                this.subTitleColorTransition.updateProperty(1 - _normalizedValue);
                this.subTitleFontTransition.updateProperty(1 - _normalizedValue);
            }

            this.lastScrollValue = _scrollTop;
            this.header.nativeElement.firstElementChild.style.opacity = this.opacitiyValue;
            if(this.opacitiyValue > 0){
                this.showFixedHeader = false;
            }
        } else {
            this.resetProperties();
        }
    }

    /**
     * 
     */
    private createTransitions(): void {
        this.widthTransition = new WidthTransition(this.titleAdjuster, 20, 50);
        this.titleColorTransition = new ColorTransition(this.titleElement, 0, 0);
        this.titleFontTransition = new FontTransition(this.titleElement, 20, 25);
        this.buttonColorTransition = new ColorTransition(this.backButtonElement, 0, 0);
        this.buttonFontTransition = new FontTransition(this.backButtonElement, 18, 24);
        this.buttonTopTransition = new TopTransition(this.backButtonElement, this.imageHeight, this.imageHeight + 200);

        if(this.subTitle != null){
            this.subTitleColorTransition = new ColorTransition(this.subTitleElement, 0, 0);
            this.subTitleFontTransition = new FontTransition(this.subTitleElement, 16, 20);
            if(this.subtitleImageUrl != null){
                this.subTitleImgFilterTransition = new FilterTransition(this.subTitleImgElement, 0, 1);
            }
        }
    }
    
    /**
     * 
     */
    private resetProperties(): void {
        this.header.nativeElement.firstElementChild.style.opacity = 1;
        this.widthTransition.resetProperty();
        this.titleColorTransition.resetProperty();
        this.titleFontTransition.resetProperty();
        this.buttonColorTransition.resetProperty();
        this.buttonFontTransition.resetProperty();
        
        if(this.subTitle != null){
            this.subTitleColorTransition.resetProperty();
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
