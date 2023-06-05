import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListCardComponent } from './file-list-card.component';

describe('FileListCardComponent', () => {
  let component: FileListCardComponent;
  let fixture: ComponentFixture<FileListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileListCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
