import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type FileViewType = 'list' | 'grid';
export type IsSidebarCollapsed = 'true' | 'false';

function _window(): any {
    return window;
}

@Injectable({
    providedIn: 'root'
})
export class BesafeGlobalService {
    private readonly isSidebarCollapsed_localStorage_KEY: string = 'is.sidebar.collapsed';
    public collapseSidebarBehaviorSubject: BehaviorSubject<IsSidebarCollapsed> = new BehaviorSubject<IsSidebarCollapsed>(this.getIsSidebarCollapsedFromLocalStorage());
    private readonly fileViewtype_localStorage_KEY: string = 'file.view.type';
    public fileViewTypeBehaviorSubject: BehaviorSubject<FileViewType> = new BehaviorSubject<FileViewType>(this.getFileViewTypeFromLocalStorage());

    constructor() { }

    public get nativeWindow(): any {
        return _window();
    }

    public toggleCollapseSidebar(): void {
        let isSidebarCollapsed = this.collapseSidebarBehaviorSubject.getValue();
        isSidebarCollapsed = isSidebarCollapsed === 'false' ? 'true' : 'false';
        localStorage.setItem(this.isSidebarCollapsed_localStorage_KEY, isSidebarCollapsed);
        this.collapseSidebarBehaviorSubject.next(this.getIsSidebarCollapsedFromLocalStorage());
    }
    private getIsSidebarCollapsedFromLocalStorage(): IsSidebarCollapsed {
        const isSidebarCollapsed = localStorage.getItem(this.isSidebarCollapsed_localStorage_KEY);
        if (isSidebarCollapsed) {
            return isSidebarCollapsed as IsSidebarCollapsed;
        } else {
            return 'false';
        }
    }

    public togglefileViewType(): void {
        let viewType = this.fileViewTypeBehaviorSubject.getValue();
        viewType = viewType === 'list' ? 'grid' : 'list';
        localStorage.setItem(this.fileViewtype_localStorage_KEY, viewType);
        this.fileViewTypeBehaviorSubject.next(this.getFileViewTypeFromLocalStorage());
    }
    private getFileViewTypeFromLocalStorage(): FileViewType {
        const viewType = localStorage.getItem(this.fileViewtype_localStorage_KEY);
        if (viewType) {
            return viewType as FileViewType;
        } else {
            return 'list';
        }
    }
}
