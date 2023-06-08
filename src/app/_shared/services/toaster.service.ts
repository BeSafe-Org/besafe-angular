import { Injectable } from '@angular/core';
import { BSToaster } from 'bs-toaster';

@Injectable({
    providedIn: 'root'
})
export class ToasterService {
    private readonly bsToaster: BSToaster = new BSToaster();

    constructor() { }

    public error(message: string): void {
        this.bsToaster.error(message);
    }

    public warn(message: string): void {
        this.bsToaster.warn(message);
    }

    public success(message: string): void {
        this.bsToaster.success(message);
    }

    public inform(message: string): void {
        this.bsToaster.inform(message);
    }
}
