import { Component, OnInit } from '@angular/core';
import { SearchService } from './_shared/services/search.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    providers: [SearchService]
})
export class LayoutComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
