import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AesCrypto } from 'src/app/_core/client/utils/AesCrypto';
import { LocalStorage } from 'src/app/_core/client/utils/LocalStorage';
import { BeSafeFile } from 'src/app/_core/models/entities/File';
import { FileManagementService } from 'src/app/_core/services/backend/file-management.service';
import { GoogleApiService } from 'src/app/_core/services/backend/google-api.service';
import { SmartContractService } from 'src/app/_core/services/backend/smart-contract.service';
import { UserManagementService } from 'src/app/_core/services/backend/user-management.service';
import { BesafeGlobalService } from 'src/app/_shared/services/besafe-global.service';
import { ThemeService } from 'src/app/_shared/services/theme.service';
import { APP_ROUTES } from 'src/app/_shared/utils/routes';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    @ViewChild('searchInput') public searchInputElement: ElementRef;
    public isSigningOut: boolean = false;
    public isConnectingGoogleCloud: boolean = false;
    private search = new Subject<string>();
    private search$: Subscription;
    public searchInputData: string = '';
    // public isSearching: boolean = false;
    // public isEmpty: boolean = false;

    constructor(
        private besafeGlobalService: BesafeGlobalService,
        private router: Router,
        private googleApiService: GoogleApiService,
        public themeService: ThemeService
    ) { }

    ngOnInit(): void {
        this.initializeSearchObserver();
    }

    public toggleCollapseSidebar(): void {
        this.besafeGlobalService.toggleCollapseSidebar();
    }

    public keyupEventHandler(event: any) {
        this.search.next(event.target.value);
    }

    private initializeSearchObserver() {
        // this.initializeView();
        this.search.pipe(
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(term => {
            this.searchInputData = term;
            if (this.searchInputData) {
                // this.initializeView();
                this.callSearchFilesAPI(this.searchInputData);
            }
        });
    }

    public callSearchFilesAPI(searchTerm: string): void {
        console.log('searchTerm', searchTerm);
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
        setTimeout(() => {
            this.googleApiService.connectCloud();
        }, 3000);
    }

    public refreshGoogle(): void {
        this.googleApiService.signOut();
    }
}
