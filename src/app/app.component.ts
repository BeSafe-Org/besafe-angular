import { Component } from '@angular/core';
import { ThemeService } from './_shared/services/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private themeService: ThemeService
    ) {
        this.themeService.toggleClassInBodyFromAppComponent();
    }
}
