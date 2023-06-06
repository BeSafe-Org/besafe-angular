import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileGridCardComponent } from './file-grid-card.component';

describe('FileGridCardComponent', () => {
  let component: FileGridCardComponent;
  let fixture: ComponentFixture<FileGridCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileGridCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileGridCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
