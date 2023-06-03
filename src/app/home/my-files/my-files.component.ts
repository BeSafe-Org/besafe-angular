import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent implements OnInit {

  constructor() { }
  files:  number[] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
  ngOnInit(): void {
  }

}
