/**
 * Transition class used to change the current values of an element's styles.
 */
export abstract class Transition{

    protected minValue: number = 0;

    protected maxValue: number = 0;

    public propertyValue: string = '';

    constructor(_min: number, _max: number) {
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
        return _normalized * (Math.abs(this.minValue - this.maxValue)) + this.minValue;
    }

}

/**
 * 
 */
export class WidthTransition extends Transition{
    
    constructor(_min: number, _max: number) {
        super(_min, _max);
    }

    public updateProperty(_value: number): void {
        let _widthValue: number = this.normalizedToValue(_value);
        
        if(_widthValue >= this.minValue && _widthValue <= this.maxValue)
            this.propertyValue = _widthValue.toString() + 'px';
    }

    public resetProperty(): void {
        this.propertyValue = this.minValue.toString() + 'px';
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

    constructor(_min: number, _max: number) {
        super(_min, _max);
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
                this.propertyValue = 'rgb('+ Math.round(_rValue) +', '+ Math.round(_gValue) +', '+ Math.round(_bValue) +')';
    }

    public resetProperty(): void {
        this.propertyValue = 'rgb('+ this.maxColor.maxR + ', '+ this.maxColor.maxG +', '+ this.maxColor.maxB +')';
    }
}


/**
 * 
 */
export class FontTransition extends Transition{
    
    constructor(_min: number, _max: number) {
        super(_min, _max);
    }

    public updateProperty(_value: number): void {

        let _size: number = this.normalizedToValue(_value);
        if(_size >= this.minValue && _size <= this.maxValue)
            this.propertyValue = _size.toString() + 'px';
    }

    public resetProperty(): void {
        this.propertyValue = this.maxValue.toString() + 'px';
    }
}

/**
 * 
 */
export class FilterTransition extends Transition{

    constructor( _min: number, _max: number) {
        super(_min, _max);
    }

    public updateProperty(_value: number): void {

        let _filterValue: number = this.normalizedToValue(_value);
        let _percentage: number = Math.round(100 - (_filterValue * 100));
        this.propertyValue = 'brightness(' + _percentage.toString() + '%) invert(' + _filterValue.toString() + ') contrast(100%)' ;
    }

    public resetProperty(): void {
        this.propertyValue = 'brightness(0%) invert(1) contrast(100%)';
    }
}



