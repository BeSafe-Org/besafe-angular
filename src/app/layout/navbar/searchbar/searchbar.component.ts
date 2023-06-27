import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchService } from '../../_shared/services/search.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-searchbar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit, OnDestroy {
    public searchPlaceholder: string = 'Search for files...';
    private search = new Subject<string>();
    private search$: Subscription;
    public searchTerm: string = '';
    // public isSearching: boolean = false;
    // public isEmpty: boolean = false;

    constructor(
        private searchService: SearchService,
    ) { }

    ngOnInit(): void {
        this.searchService.searchInObserver.subscribe((value) => {
            switch (value) {
                case 'all-files':
                    this.searchPlaceholder = 'Search for files...';
                    break;
                case 'ultra-safe-files':
                    this.searchPlaceholder = 'Search for ultra safe files...';
                    break;
                case 'favourite-files':
                    this.searchPlaceholder = 'Search your favourite files...';
                    break;
                case 'recycle-bin':
                    this.searchPlaceholder = 'Search for files in trash...';
            }
        });
        switch (this.searchService.searchIn) {
            case 'all-files':
                this.searchPlaceholder = 'Search for files...';
                break;
            case 'ultra-safe-files':
                this.searchPlaceholder = 'Search for ultra safe files...';
                break;
            case 'favourite-files':
                this.searchPlaceholder = 'Search your favourite files...';
                break;
            case 'recycle-bin':
                this.searchPlaceholder = 'Search for files in trash...';
        }
        this.initializeSearchObserver();
    }

    public keyupEventHandler(event: any) {
        this.search.next(event.target.value);
    }

    private initializeSearchObserver() {
        // this.initializeView();
        this.search$ = this.search
            // .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe(term => {
                this.searchTerm = term;
                this.callSearchFilesAPI();
            });
    }

    public callSearchFilesAPI(): void {
        this.searchService.searchInitiator.next({ in: 'all-files', searchTerm: this.searchTerm });
    }

    ngOnDestroy(): void {
        this.search$?.unsubscribe();
    }
}
