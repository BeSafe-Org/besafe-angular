import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type ButtonDisplayType = 'PRIMARY' | 'SECONDARY';
type ButtonFunctionalityType = 'button' | 'submit';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
    @Input('buttonDisplayType') buttonDisplayType: ButtonDisplayType = 'PRIMARY';
    @Input('buttonFunctionalityType') buttonFunctionalityType: ButtonFunctionalityType = 'button';
    @Input('imgSrc') imgSrc: string = '';
    @Input('title') title: string;
    @Input('isDisabled') isDisabled: boolean = false;

    @Output('clicked') clickedEventEmitter: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    ngOnInit(): void {
    }

    public clicked(): void {
        this.clickedEventEmitter.emit();
    }
}
