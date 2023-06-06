import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Conversion {

    constructor() { }

    convertFileToArrayBuffer(file: File): Observable<ArrayBuffer> {
        return new Observable<ArrayBuffer>(observer => {
            const reader = new FileReader();
            reader.onload = () => {
                const arrayBuffer = reader.result as ArrayBuffer;
                observer.next(arrayBuffer);
                observer.complete();
            };
            reader.onerror = () => {
                observer.error(reader.error);
            };
            reader.readAsArrayBuffer(file);
        });
    }

    convertBlobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result instanceof ArrayBuffer) {
                    resolve(reader.result);
                } else {
                    reject(new Error('Failed to convert Blob to ArrayBuffer.'));
                }
            };
            reader.onerror = () => {
                reject(new Error('Failed to convert Blob to ArrayBuffer.'));
            };
            reader.readAsArrayBuffer(blob);
        });
    }

}