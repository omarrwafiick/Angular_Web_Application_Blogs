import { Directive, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';

@Directive({
  standalone:true,
  selector: '[appPopupListener]',
})
export class PopupListenerDirective {
constructor(private Element:ElementRef) { }
@Output()
cliko = new EventEmitter<boolean>();
@HostListener('document:click',['$event.target'])
public clickOutside(targetEl: HTMLElement):void{
    if(this.Element.nativeElement==targetEl){
        this.cliko.emit(false);
    }
}
}
 