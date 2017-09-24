/**
 * Transition class used to change the current values of an element's styles.
 */
export abstract class Transition{

    protected element: any;

    protected minValue: number = 0;

    protected maxValue: number = 0;

    protected smoothValue: number = 0;

    constructor(_elment: any, _min: number, _max: number) {
        this.element = _elment;
        this.minValue = _min;
        this.maxValue = _max;
    }

    /**
     * Update the property style value of an element view.
     * @param _value 
     */
    public abstract updateProperty(_value: number): void;
    /**
     * Reset the property style value of the current element.
     */
    public abstract resetProperty(): void;

    /**
     * Return a normalized value between the min and max value setted.
     * @param _value current value to normalize.
     */
    public valueToNormalized(_value: number): number {
        return (Math.abs(_value - this.minValue))/(Math.abs(this.maxValue - this.minValue));
    }

    /**
     * Return the real value based of a normalized value.
     * @param _normalized current normalized value.
     */
    public normalizedToValue(_normalized: number): number {
        return _normalized * (Math.abs(this.minValue - this.maxValue)) + this.minValue + this.smoothValue;
    }

}

/**
 * 
 */
export class WidthTransition extends Transition{
    
    constructor(_element: any, _min: number, _max: number) {
        super(_element, _min, _max);
    }

    public updateProperty(_value: number): void {
        let _widthValue: number = this.normalizedToValue(_value);
        
        if(_widthValue >= this.minValue && _widthValue <= this.maxValue)
            this.element.nativeElement.style.width = _widthValue.toString() + 'px';
    }

    public resetProperty(): void {
        this.element.nativeElement.style.width = this.minValue.toString() + 'px';
    }

}

/**
 * 
 */
export class ColorTransition extends Transition{
    
    private maxColor: any = {
        maxR: 255,
        maxG: 255,
        maxB: 255,
    };
    
    private minColor: any = {
        minR: 221,
        minG: 74,
        minB: 88,
    };

    constructor(_element: any, _min: number, _max: number) {
        super(_element, _min, _max);
    }

    public updateProperty(_value: number): void {

        this.minValue = this.minColor.minR;
        this.maxValue = this.maxColor.maxR;
        let _rValue: number = this.normalizedToValue(_value);

        this.minValue = this.minColor.minG;
        this.maxValue = this.maxColor.maxG;
        let _gValue: number = this.normalizedToValue(_value);

        this.minValue = this.minColor.minB;
        this.maxValue = this.maxColor.maxB;
        let _bValue: number = this.normalizedToValue(_value);

        if( (_rValue >= this.minColor.minR && _rValue <= this.maxColor.maxR) && 
            (_gValue >= this.minColor.minG && _gValue <= this.maxColor.maxG) && 
            (_bValue >= this.minColor.minB && _bValue <= this.maxColor.maxB))
                this.element.nativeElement.style.color = 'rgb('+ Math.round(_rValue) +', '+ Math.round(_gValue) +', '+ Math.round(_bValue) +')';
    }

    public resetProperty(): void {
        this.element.nativeElement.style.color = 'rgb('+ this.maxColor.maxR + ', '+ this.maxColor.maxG +', '+ this.maxColor.maxB +')';
    }
}

/**
 * 
 */
export class FontTransition extends Transition{
    
    constructor(_element: any, _min: number, _max: number) {
        super(_element, _min, _max);
    }

    public updateProperty(_value: number): void {

        let _size: number = this.normalizedToValue(_value);

        this.element.nativeElement.style.fontSize = _size.toString() + 'px';
    }

    public resetProperty(): void {
        this.element.nativeElement.style.fontSize = this.maxValue.toString() + 'px';
    }
}

/**
 * 
 */
export class TopTransition extends Transition{

    private minAuxValue: number = 0;

    constructor(_element: any, _min: number, _max: number) {
        super(_element, _min, _max);
        this.minAuxValue = _min;
        this.smoothValue = 9;
    }

    public updateProperty(_value: number): void {
        this.minValue = 0;
        let _normalizedScrollValue: number = this.valueToNormalized(_value);
        this.minValue = (this.minAuxValue * 0.05);
        
        let _topValue: number = this.normalizedToValue(_normalizedScrollValue);
        this.element.nativeElement.style.top = _topValue.toString() + 'px';
    }

    public resetProperty(): void {
        console.warn('TopTransition: Method "resetProperty" not implemented.')
    }
}

/**
 * 
 */
export class FilterTransition extends Transition{

    constructor(_element: any, _min: number, _max: number) {
        super(_element, _min, _max);
    }

    public updateProperty(_value: number): void {

        let _filterValue: number = this.normalizedToValue(_value);
        let _percentage: number = Math.round(100 - (_filterValue * 100));
        this.element.nativeElement.style.filter = 'brightness(' + _percentage.toString() + '%) invert(' + _filterValue.toString() + ') contrast(100%)' ;
    }

    public resetProperty(): void {
        this.element.nativeElement.style.filter = 'brightness(0%) invert(1) contrast(100%)';
    }
}



