import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltraSavedFilesComponent } from './ultra-saved-files.component';

describe('UltraSavedFilesComponent', () => {
  let component: UltraSavedFilesComponent;
  let fixture: ComponentFixture<UltraSavedFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UltraSavedFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UltraSavedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
