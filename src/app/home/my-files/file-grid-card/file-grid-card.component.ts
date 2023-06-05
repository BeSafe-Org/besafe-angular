import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-file-grid-card',
    templateUrl: './file-grid-card.component.html',
    styleUrls: ['./file-grid-card.component.scss']
})
export class FileGridCardComponent implements OnInit {
    @Input() isSelected: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    public toggleSelection(): void {
        this.isSelected = !this.isSelected;
    }
}
