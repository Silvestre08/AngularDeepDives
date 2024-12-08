import { Directive, ElementRef, forwardRef, HostListener, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DATE_VALUE_PROVIDER: Provider = 
{
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() =>DateValueAccessorDirective ),
  multi:true
}
@Directive({
  selector: 'input([type=date])[ngModel],input([type=date])[formControl],input([type=date])[formControlName]',
  providers: [DATE_VALUE_PROVIDER]
})
export class DateValueAccessorDirective implements ControlValueAccessor {

  constructor(private element: ElementRef) {

   }

  // called whenever the bound data model field value changes, updating the html element
  writeValue(newValue: any): void {
    if(newValue instanceof Date){
          this.element.nativeElement.value = newValue.toISOString().split('T')[0] 
    }
    //yyyy-mm-dd
  }

  // to handle the changes in the html elements we need to register to the events. We fetch the event target property as date
  // That will return the text of the input element as a date. sowhen the input event fires it will call our onChange method and pass in the valueAsDate value.
  @HostListener('input', ['$event.target.valueAsDate']) private onChange!: Function
  
  // when angular sees a control value access directive it call the register on change and provides the callbackfuntion we need to call to update our data model
  // so our function fetches the value as date from our input element and we pass the value as an actual date object to the callback angular provides us.
  registerOnChange(fn: Function): void {
   this.onChange = (valueAsDate: Date) => {fn(valueAsDate)};
  }

  @HostListener('blur', []) private onTouched!: Function
  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }

}
