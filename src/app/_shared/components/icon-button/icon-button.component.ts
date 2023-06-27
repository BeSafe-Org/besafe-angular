import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {
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
