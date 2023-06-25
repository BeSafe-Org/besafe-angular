import { AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BeSafeFile } from 'src/app/_core/models/entities/File';
import { BesafeGlobalService } from 'src/app/_shared/services/besafe-global.service';

export type ContextMenuPointerEventPosition = { x: number, y: number }

type ClickedOption = 'download' | 'star' | 'delete' | 'restore';

type ContextMenuOption = {
    type: ClickedOption,
    name: string,
    isForSingle: boolean,
    svgImgName: string
}

@Component({
    selector: 'app-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent implements OnInit, AfterViewInit {
    @Output() clickedOnOption: EventEmitter<ClickedOption> = new EventEmitter<ClickedOption>();

    public selfRef: ComponentRef<ContextMenuComponent>;
    public selectedFiles: BeSafeFile[];
    public pointerEventPosition: ContextMenuPointerEventPosition;
    private _top: number;
    private _left: number;
    public options: ContextMenuOption[];

    public get top(): number {
        return this._top;
    }

    public get left(): number {
        return this._left;
    }

    constructor(
        private besafeGlobalService: BesafeGlobalService,
        private elementRef: ElementRef,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.setPosition();
    }

    public shouldBeVisible(isForSingle: boolean): boolean {
        if (!isForSingle) return true;
        if (this.selectedFiles.length <= 1) {
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

    public contextMenuClickHandler(optionName: ClickedOption): void {
        this.clickedOnOption.emit(optionName);
        this.selfRef.destroy();
    }
}
