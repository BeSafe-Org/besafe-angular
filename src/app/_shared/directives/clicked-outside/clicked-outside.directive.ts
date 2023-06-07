import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Directive({
    selector: '[appClickedOutside]'
})
export class ClickedOutsideDirective implements AfterViewInit, OnDestroy {
    @Output() clickedOutside: EventEmitter<void> = new EventEmitter<void>();

    private clickedEvent$: Subscription;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private elementRef: ElementRef
    ) { }

    ngAfterViewInit(): void {
        this.clickedEvent$ = fromEvent(this.document, 'click')
            .pipe(filter((event: any): boolean => {
                return !this.isInside(event.target as HTMLElement);
            }))
            .subscribe(() => {
                console.log('clicked outside');
                this.clickedOutside.emit('f' as unknown as void);
            });
    }

    isInside(elementToCheck: HTMLElement): boolean {
        const isSame = elementToCheck === this.elementRef.nativeElement;
        const temp = this.elementRef.nativeElement.contains(elementToCheck)
        return isSame || temp;
    }

    ngOnDestroy(): void {
        this.clickedEvent$?.unsubscribe();
    }
}
