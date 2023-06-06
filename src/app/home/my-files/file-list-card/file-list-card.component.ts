import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-file-list-card',
    templateUrl: './file-list-card.component.html',
    styleUrls: ['./file-list-card.component.scss']
})
export class FileListCardComponent implements OnInit {
    @Input() isSelected: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    public toggleSelection(): void {
        this.isSelected = !this.isSelected;
    }
}
