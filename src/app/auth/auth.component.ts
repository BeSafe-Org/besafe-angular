import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../_shared/services/theme.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    constructor(
        public themeService: ThemeService
    ) { }

    ngOnInit(): void {
    }

}
