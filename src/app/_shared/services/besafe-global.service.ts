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
        const isSidebarCollapsed: IsSidebarCollapsed = this.collapseSidebarBehaviorSubject.getValue() === 'false' ? 'true' : 'false';
        localStorage.setItem(this.isSidebarCollapsed_localStorage_KEY, isSidebarCollapsed);
        this.collapseSidebarBehaviorSubject.next(this.getIsSidebarCollapsedFromLocalStorage());
    }
    private getIsSidebarCollapsedFromLocalStorage(): IsSidebarCollapsed {
        const isSidebarCollapsed = localStorage.getItem(this.isSidebarCollapsed_localStorage_KEY);
        return isSidebarCollapsed ? isSidebarCollapsed as IsSidebarCollapsed : 'false';
    }

    public changeFileView(): void {
        const viewType: FileViewType = this.fileViewTypeBehaviorSubject.getValue() === 'list' ? 'grid' : 'list';
        localStorage.setItem(this.fileViewtype_localStorage_KEY, viewType);
        this.fileViewTypeBehaviorSubject.next(this.getFileViewTypeFromLocalStorage());
    }
    private getFileViewTypeFromLocalStorage(): FileViewType {
        const viewType = localStorage.getItem(this.fileViewtype_localStorage_KEY);
        return viewType ? viewType as FileViewType : 'grid';
    }
}
