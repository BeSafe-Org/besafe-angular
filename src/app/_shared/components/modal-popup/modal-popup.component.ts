import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-modal-popup',
    templateUrl: './modal-popup.component.html',
    styleUrls: ['./modal-popup.component.scss'],
    exportAs: 'modalPopupRef'
})
export class ModalPopupComponent implements OnInit {
    @ContentChild('mainContent') mainContent: TemplateRef<unknown>;

    @Input() heading: string = '';
    @Input() subheading: string = '';
    @Input() isHideCloseButton: boolean = false;
    @Input() secondaryButtonText: string = '';
    @Input() primaryButtonText: string = '';
    @Input() secondaryButtonImgSrc: string = '';
    @Input() primaryButtonImgSrc: string = '';
    @Input() buttonsPosition: 'flex-end' | 'center' = 'flex-end';

    @Output() clickedOnCloseButton: EventEmitter<void> = new EventEmitter<void>();
    @Output() clickedOnSecondaryButton: EventEmitter<void> = new EventEmitter<void>();
    @Output() clickedOnPrimaryButton: EventEmitter<void> = new EventEmitter<void>();

    public showPopUp: boolean = false;

    constructor() { }

    ngOnInit(): void {
        setTimeout(() => {
            this.showPopUp = true;
        }, 100);
    }

    public onClickCloseButton(): void {
        this.clickedOnCloseButton.emit();
    }

    public onClickSecondaryButton(): void {
        this.clickedOnSecondaryButton.emit();
    }

    public onClickPrimaryButton(): void {
        this.clickedOnPrimaryButton.emit();
    }
}
