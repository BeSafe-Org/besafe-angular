import { Component, OnInit } from '@angular/core';
import { APP_ROUTES } from 'src/app/_shared/utils/routes';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public readonly sidebarOptions = [
        { title: 'All files', routerLink: `/${APP_ROUTES.home._}/${APP_ROUTES.home.myFiles._}` },
        { title: 'Ultra Safe Files*', routerLink: `/${APP_ROUTES.home._}/${APP_ROUTES.home.ultraSavedFiles._}` },
        { title: 'Starred', routerLink: `/${APP_ROUTES.home._}/${APP_ROUTES.home.starredFiles._}` },
        { title: 'Recycle bin', routerLink: `/${APP_ROUTES.home._}/${APP_ROUTES.home.recycleBin._}` }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
