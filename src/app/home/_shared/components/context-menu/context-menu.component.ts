import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { BesafeGlobalService } from 'src/app/_shared/services/besafe-global.service';

export type ContextMenuPointerEventPosition = { x: number, y: number }

@Component({
    selector: 'app-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent implements AfterViewInit {
    @Output() clickedOnOption: EventEmitter<{ optionName: string }> = new EventEmitter<{ optionName: string }>();

    public selfRef: ComponentRef<ContextMenuComponent>;
    public selectedFilesId: string[];
    public pointerEventPosition: ContextMenuPointerEventPosition;
    private _top: number;
    private _left: number;

    public get top(): number {
        return this._top;
    }

    public get left(): number {
        return this._left;
    }

    public readonly options = [
        { name: 'Mark as favourite', isForSingle: true, svgImgName: 'open-folder' },
        { name: 'Download', isForSingle: true, svgImgName: 'open-folder' },
        { name: 'Delete', isForSingle: true, svgImgName: 'open-folder' }
    ];

    constructor(
        private besafeGlobalService: BesafeGlobalService,
        private elementRef: ElementRef,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngAfterViewInit(): void {
        this.setPosition();
    }

    public shouldBeVisible(isForSingle: boolean): boolean {
        if (!isForSingle) return true;
        if (this.selectedFilesId.length <= 1) {
            return true;
        }
        return false;
    }

    private setPosition(): void {
        this._top = this.positionContextMenuTop();
        this._left = this.positionContextMenuLeft();
        this.changeDetectorRef.detectChanges();
    }

    private positionContextMenuTop(): number {
        const y = this.pointerEventPosition.y;
        const height = this.getPropertyValue('height');
        const remaining = this.besafeGlobalService.nativeWindow.innerHeight - y;
        if (remaining < height) return y - Math.abs(remaining - height);
        return y;
    }

    private positionContextMenuLeft(): number {
        const x = this.pointerEventPosition.x;
        const width = this.getPropertyValue('width');
        const remaining = this.besafeGlobalService.nativeWindow.innerWidth - x;
        if (remaining < width) return x - width;
        return x;
    }

    private getPropertyValue(property: string): number {
        return Number.parseInt(
            this.besafeGlobalService.nativeWindow
                .getComputedStyle(this.elementRef.nativeElement.firstElementChild)
                .getPropertyValue(property)
        );
    }

    public contextMenuClickHandler(optionName: string): void {
        this.clickedOnOption.emit({ optionName: optionName });
        this.selfRef.destroy();
    }
}
