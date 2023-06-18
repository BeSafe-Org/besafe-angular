import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type ButtonDisplayType = 'primary' | 'secondary' | 'tertiary';
type ButtonFunctionalityType = 'button' | 'submit';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
    @Input() buttonDisplayType: ButtonDisplayType = 'primary';
    @Input() buttonFunctionalityType: ButtonFunctionalityType = 'button';
    @Input() imgSrc: string = '';
    @Input() title: string;
    @Input() isDisabled: boolean = false;
    @Input() isLoading: boolean = false;

    @Output('clicked') clickedEventEmitter: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    ngOnInit(): void {
    }

    public clicked(): void {
        this.clickedEventEmitter.emit();
    }
}
