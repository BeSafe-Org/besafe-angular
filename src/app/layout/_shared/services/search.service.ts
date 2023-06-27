import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

type SearchIn = 'all-files' | 'ultra-safe-files' | 'favourite-files' | 'recycle-bin';

type SearchInitiator = {
    in: SearchIn,
    searchTerm: string
};

@Injectable()
export class SearchService implements OnDestroy {
    public searchInitiator: BehaviorSubject<SearchInitiator> = new BehaviorSubject<SearchInitiator>({ in: 'all-files', searchTerm: '' });
    public searchIn: SearchIn;
    public searchInObserver: Subject<SearchIn> = new Subject<SearchIn>();
    private searchIn$: Subscription;
    public searchPlaceholder: string;

    constructor() {
        this.initializeSearchInObserver();
    }

    private initializeSearchInObserver(): void {
        this.searchIn$ = this.searchInObserver.subscribe((value: SearchIn) => {
            if (this.searchIn === value) {
                this.searchIn = value;
            }
            else {
                this.searchIn = value;
                this.searchInObserver.next(value);
            }
        });
    }

    ngOnDestroy(): void {
        console.log(this.searchIn);
        this.searchIn$?.unsubscribe();
    }
}
