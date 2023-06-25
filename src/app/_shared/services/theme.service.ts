import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum Theme {
    Light = 'light',
    Dark = 'dark'
};

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly theme_localStorage_KEY: string;
    private _theme: Theme;
    private themeBehaviorSubject: BehaviorSubject<Theme>;

    public get theme(): Theme {
        return this._theme;
    }

    constructor(
        @Inject(DOCUMENT) private _document: Document
    ) {
        this.theme_localStorage_KEY = 'theme';
        this._theme = this.getThemeFromLocalStorage();
        this.themeBehaviorSubject = new BehaviorSubject<Theme>(this._theme);
        this.toggleClassInBody(this._theme);
    }

    public changeTheme(): void {
        this._theme = this.themeBehaviorSubject.getValue() === 'dark' ? Theme.Light : Theme.Dark;
        localStorage.setItem(this.theme_localStorage_KEY, this._theme);
        this.themeBehaviorSubject.next(this._theme);
        this.toggleClassInBody(this._theme);
    }

    private toggleClassInBody(theme: Theme): void {
        if (theme === Theme.Light) {
            this._document.body.classList.remove(Theme.Dark);
            this._document.body.classList.add(Theme.Light);
        }
        else {
            this._document.body.classList.remove(Theme.Light);
            this._document.body.classList.add(Theme.Dark);
        }
    }

    private getThemeFromLocalStorage(): Theme {
        const theme = localStorage.getItem(this.theme_localStorage_KEY);
        return theme ? theme as Theme : Theme.Light;
    }
}
