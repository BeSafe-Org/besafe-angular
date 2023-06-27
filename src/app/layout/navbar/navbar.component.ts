import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from 'src/app/_core/client/utils/LocalStorage';
import { GoogleApiService } from 'src/app/_core/services/backend/google-api.service';
import { BesafeGlobalService } from 'src/app/_shared/services/besafe-global.service';
import { ThemeService } from 'src/app/_shared/services/theme.service';
import { APP_ROUTES } from 'src/app/_shared/utils/routes';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isSigningOut: boolean = false;
    public isConnectingGoogleCloud: boolean = false;

    constructor(
        private besafeGlobalService: BesafeGlobalService,
        private router: Router,
        private googleApiService: GoogleApiService,
        public themeService: ThemeService
    ) { }

    ngOnInit(): void {
    }

    public toggleCollapseSidebar(): void {
        this.besafeGlobalService.toggleCollapseSidebar();
    }

    public signOut(): void {
        this.isSigningOut = true;
        setTimeout(() => {
            new LocalStorage().removeItem("userId");
            new LocalStorage().removeItem("masterKey");
            this.router.navigate([`${APP_ROUTES.auth._}`]);
        }, 3000);
    }

    public connectGoogleCloud(): void {
        this.isConnectingGoogleCloud = true;
        localStorage.setItem('isCloudConnected', 'true');
        this.googleApiService.connectCloud();
    }

    public refreshGoogle(): void {
        this.googleApiService.signOut();
    }
}
