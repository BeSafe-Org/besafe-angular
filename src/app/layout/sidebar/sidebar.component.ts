import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BesafeGlobalService } from 'src/app/_shared/services/besafe-global.service';
import { APP_ROUTES } from 'src/app/_shared/utils/routes';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
    public readonly sidebarOptions = [
        { title: 'All files', routerLink: `/${APP_ROUTES.home._}/${APP_ROUTES.home.myFiles._}` },
        { title: 'Ultra Safe Files*', routerLink: `/${APP_ROUTES.home._}/${APP_ROUTES.home.ultraSavedFiles._}` },
        { title: 'Starred', routerLink: `/${APP_ROUTES.home._}/${APP_ROUTES.home.starredFiles._}` },
        { title: 'Recycle bin', routerLink: `/${APP_ROUTES.home._}/${APP_ROUTES.home.recycleBin._}` }
    ];
    public isSidebarCollapsed: boolean = true;
    private isSidebarCollapsedSubscription: Subscription;

    constructor(
        private besafeGlobalService: BesafeGlobalService
    ) { }

    ngOnInit(): void {
        this.initializeCollapseSidebarObserver();
    }

    ngAfterViewInit(): void {
    }

    private initializeCollapseSidebarObserver(): void {
        this.isSidebarCollapsedSubscription = this.besafeGlobalService.collapseSidebarBehaviorSubject.subscribe(value => {
            this.isSidebarCollapsed = value === 'true';
        });
    }

    ngOnDestroy(): void {
        this.isSidebarCollapsedSubscription.unsubscribe();
    }
}
