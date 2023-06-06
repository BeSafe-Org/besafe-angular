import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { AddFilesModalPopupComponent } from './add-files-modal-popup/add-files-modal-popup.component';

type ViewType = 'list' | 'grid';

@Component({
    selector: 'app-my-files',
    templateUrl: './my-files.component.html',
    styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent implements OnInit {
    public viewType: ViewType = 'grid';
    public files: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef
    ) { }

    ngOnInit(): void {
    }

    public toggleViewType(): void {
        this.viewType = this.viewType === 'grid' ? 'list' : 'grid';
    }

    public openAddFileModalPopup(): void {
        const factory = this.componentFactoryResolver.resolveComponentFactory(AddFilesModalPopupComponent);
        const addFilesModalPopupComponentRef = this.viewContainerRef.createComponent(factory);
        addFilesModalPopupComponentRef.instance.selfRef = addFilesModalPopupComponentRef;
    }
}
