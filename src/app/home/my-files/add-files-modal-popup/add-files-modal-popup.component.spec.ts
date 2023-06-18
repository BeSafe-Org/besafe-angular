import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilesModalPopupComponent } from './add-files-modal-popup.component';

describe('AddFilesModalPopupComponent', () => {
  let component: AddFilesModalPopupComponent;
  let fixture: ComponentFixture<AddFilesModalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFilesModalPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFilesModalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
